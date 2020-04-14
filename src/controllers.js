const Redis = require('ioredis');
const mongoose = require('mongoose');
const { CountryModel, TodayModel, ResourceModel, DonateModel } = require('./model');
const config = require('../config.json');
const { getNews } = require('./robots/getNews');

const F = require('./utils/F');

const redis = new Redis(
  config.redis.host, {
  password: config.redis.password,
  port: config.redis.port
})

const { keys } = config

const execAll = () => {
  F.getCountryList(redis, keys),
  F.getCountryStats('israel', redis, keys),
  F.getCountryStats('world', redis, keys),
  F.getWorldYesterday(redis, keys),
  F.newsHeb(keys, redis)
};

// Executing On App Start 
execAll();
// Execute every 1800000 seconds, i.e 30 minutes
setInterval(execAll, 900000);
// Execute Once A Day
// setInterval(() => F.getCountryList(redis, keys), 86400000)


const { capitalize, getCountryStats, sortCountryObj, isWorld } = require('./utils');

const worldYesterday = async (req, res, next) => {
  try {
    const countries = JSON.parse(await redis.get(keys.worldYesterday))
    if (!data) {
      let getDataNow = F.getCountryList(redis, keys)
      return res.status(200).json(countries)
    }
    return res.status(200).json(countries)
  } catch(e) {
    return res.status(500).json({ message: 'Your Request Has not been processed'})
  }
}

const getResources = async (req, res, next) => {
  console.log('client reaching resources file');

  try {
    const data = await ResourceModel.find( { category: { $ne: '' } }, {'_id': 0, '__v': 0, 'createdAt': 0}).sort({ category: 1 })
    return res.status(200).json(data)
  } catch(e) {
    console.log('error occured', e);

    res.status(404).json({ message: e })
  }
}

const single = async (req, res, next) => {
  console.log('client attempts to access: /v1/alltime/:country route');

  try {
    const { country } = req.params
    const data = await CountryModel.find({ location: capitalize(country) }, {'_id': 0, '__v': 0, 'createdAt': 0})
    setTimeout(() => console.log(data), 1500)
    return res.status(200).json(data)
  } catch(e) {
    return res.status(404).json({ message: e })
  }
}

const getCountries = async (req, res, next) => {
  try {
    const countries = JSON.parse(await redis.get(keys.countriesList))
    if (!countries) {
      return res.status(404).json({ message: e })
    }
    return res.status(200).json({ countries })
  } catch(e) {
    return res.status(404).json({ message: e })
  }
}

const worldOverTime = async (req, res, next) => {

  console.log('client attempts to access: /v1/alltime/ route');

  try {
    const data = await CountryModel.find({ location: 'World' })
    console.log(data);
    return res.status(200).json(data)
  } catch(e) {
      return res.status(404).json({ message: e })
  }
}

const todayCountry = async (req, res, next) => {
  console.log('request has been made to:: /todayCountry/');
  const cn = req.params.country || 'world'
  const redisKey = keys.countryToday + cn

  try {
    let data = JSON.parse(await redis.get(redisKey))
    if ( !data ) {
      data = await F.getCountryStats(cn, redis, keys)
      return res.status(200).json(data)
    }
    return res.status(200).json(data)
  } catch(error) {
    console.log(error);
    console.log('HIASDASD');
    return res.status(500).json(error)
  }

}

const getNewsHeb = async (req, res, next) => {
  try {
    const newsHeb = JSON.parse(await redis.get(keys.newsHeb))
    res.status(200).json({ data: newsHeb })
  } catch(err) {
    return res.status(404).json({ message: err })
  }
}

const receiveDonationMessages = async (req, res, next) => {

  try {
    const parsed = JSON.parse(await redis.get('donations'))
    return res.send(200).json({ data: parsed })
  } catch(e) {
    return res.status(500).json({ message: 'Your Request Has not been processed'})
  }

}


const donateStream = async (req, res, next) => {

  console.log('request has been made to Donate Stream API')

  try {
    const { data } = req.body
    const newDonate = new DonateModel(data).save()
    console.log(data)
    const allDonations = await DonateModel.find({})
    const stringify = JSON.stringify(allDonations)
    redis.set('donations', stringify)
    return res.status(200).json({ message: 'Thanks, Received the data' })
  } catch(e) {
    return res.status(500).json({ message: 'Your Request Has not been processed'})
  }
}



async function addTodayCountry(data, cn) {
  let obj = isWorld(cn)
    ? { ...data, country: 'world' }
    : { ...data, country: data.country.toLowerCase() }
  const newCn = new TodayModel(obj).save()
  console.log('added entry to db');
  return newCn
}

module.exports = {
  single,
  worldOverTime,
  todayCountry,
  getCountries,
  getResources,
  getNewsHeb,
  donateStream,
  receiveDonationMessages,
  worldYesterday
}

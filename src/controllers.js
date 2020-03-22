const mongoose = require('mongoose');
const fetch = require('node-fetch');
const { CountryModel, TodayModel } = require('./model');

const { capitalize, getCountryStats, sortCountryObj, isWorld } = require('./utils');


const single = async (req, res, next) => {
  console.log('client attempts to access: /v1/alltime/:country route');

  try {
    const { country } = req.params
    const data = await CountryModel.find({ location: capitalize(country) }, {'_id': 0, '__v': 0, 'createdAt': 0})
    return res.status(200).json(data)
  } catch(e) {
    return res.status(404).json({ message: e })
  }
}

const getCountries = async (req, res, next) => {
  try {
    const data = await CountryModel.find({})
    const countries = [...new Set(data.map(a => a.location))]
    return res.status(404).json({ data: countries })
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

  const country = req.params.country || 'world'

  try {
    const data = await TodayModel.findOne({ country })
    if (!data) {
      const stats = await getCountryStats(country.toLowerCase())
      const newCn = await addTodayCountry(stats, country)
      return res.status(200).json(newCn)
    }
    console.log('successfully finished today/ route');
    return res.status(200).json(data)
  } 
  catch(e) {
    console.log(e);
    return res.status(404).json({ message: e })
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
  getCountries
}

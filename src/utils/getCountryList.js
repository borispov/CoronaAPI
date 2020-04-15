const mongoose = require('mongoose');
const { CountryModel } = require('../model');


const getCountryList = async (redis, keys) => {
  try {
    const data = await CountryModel.find({})
    const countries = [...new Set(data.map(a => a.location))]
    const stringify = JSON.stringify(countries)
    const redisKey = keys.countriesList
    redis.set(redisKey, stringify)
    // return countries
    console.log('added country list to redis');
  } catch(e) {
    return null
  }
}

module.exports = getCountryList

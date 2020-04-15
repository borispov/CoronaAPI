const axios = require('axios');
const API_URL = `https://corona.lmao.ninja/v2/countries/`

const getAllCountriesStats = async (redis, keys) => {
  let response;
  try {
    response = await axios.get(API_URL)
    if (response.status !== 200) {
      return console.log('ERROR. NOT OK');
    }
  } catch(e){ console.log('problem');return null }
  const countries = response.data
  countries.map(country => {
    const stringData = JSON.stringify(country)
    const redisKey = keys.countryToday + country.country.toLowerCase()
    redis.set(redisKey, stringData)
  })
  return response.data
}

module.exports = getAllCountriesStats

const axios = require('axios');
const API_URL = `https://corona.lmao.ninja/`
const API_EXT = c => c === 'world' ? 'all/' : `countries/${c}`

const getCountryStats = async (cn, redis, keys) => {
  let response;
  const url = API_URL + API_EXT(cn)

  try {
    response = await axios.get(url)
    if (response.status !== 200) {
      return console.log('ERROR. NOT OK');
    }
  } catch(e){ return null }
  const stringData = JSON.stringify(response.data)
  const redisKey = keys.countryToday + cn
  redis.set(redisKey, stringData)
  return response.data
}

module.exports = getCountryStats

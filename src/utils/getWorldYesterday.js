const axios = require('axios');

const URL = 'https://corona.lmao.ninja/v2/all?yesterday=true'

const getWorldYesterday = async (redis, keys) => {
  let response;

  try {
    response = await axios.get(URL)
      if (response.status !== 200) { return console.log('ERROR. NOT OK'); }
  } catch(e){ return null }
  const stringData = JSON.stringify(response.data)
  const redisKey = keys.worldYesterday
  redis.set(redisKey, stringData)
  return response.data
}

module.exports = getWorldYesterday

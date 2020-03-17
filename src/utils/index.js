const fetch = require('node-fetch');
const API_URL = `https://corona.lmao.ninja/`


const isWorld = cn => cn === 'world'
const capitalize = str => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
const lower = str => str.toLowerCase()
const API_EXT = c => c === 'world' ? 'all/' : `countries/${c}`

const getCountryStats = (cn) => {
  console.log('fetching from API');
  const url = API_URL + API_EXT(cn)
  return fetch(url)
    .then(res => res.json())
    .catch(e => e)
}

module.exports = {
  capitalize,
  getCountryStats,
  isWorld
}

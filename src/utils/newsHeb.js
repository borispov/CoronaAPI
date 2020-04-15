const getNews = require('../robots/getNews');

const newsHeb = async (redis, keys) => {

  try {
    const israelHayom = await getNews('israelHayom')
    const maariv = await getNews('maariv')
    const ynet = await getNews('ynet')
    const data = [...maariv, ...ynet, ...israelHayom]
    const stringData = JSON.stringify(data)
    redis.set(keys.newsHeb, stringData)
    return console.log('UPDATED NEWS FOLDER, NOW HAVE: ', data.length);
  } catch(e) {
      console.log('Error occured fetching news: \n', e);
      return null
  }
}

module.exports = newsHeb;

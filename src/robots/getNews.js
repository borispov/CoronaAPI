const cheerio = require('cheerio');
const Parser = require('rss-parser');
const parser = new Parser({
  customFields: { item: [['Tags', 'tags'],  'SectionRssURL', 'tags', 'image', 'img',{ keepArray: true }] }
})

const URLS = {
  israelHayom: 'https://www.israelhayom.co.il/rss.xml',
  ynet: 'http://www.ynet.co.il/Integration/StoryRss2.xml',
  maariv: 'https://www.maariv.co.il/Rss/RssFeeds'
}

// UTILITY functions
// const containKeyword = keyword => string => string.toLowerCase().split(' ').findIndex(s => s === keyword) !== -1 ? true : false
const containKeyword = keyword => string => string.toLowerCase().includes(keyword)
const hasHebCorona = containKeyword('קורונה')
const hasEngCorona = containKeyword('corona')
const filterTag = s => arr => arr.split(' ').includes(s)
const tagHebCorona = filterTag('קורונה')

// FEED specific filters
const tagsFilt = ({ tags }) => hasHebCorona(tags)
const titleFilt = ({ title }) => hasHebCorona(title)
const feedFilterTags = feed => feed.items.filter(tagsFilt)
const feedFilterTitle = feed => feed.items.filter(titleFilt)

// cheerio funcs for working with some HTML lines
const stripHtml = html => cheerio.load(html).text()
const getImg = html => {
  const $ = cheerio.load(html)
  return $('img').attr('src')
}

async function getNews(channel) {
  let coronaItems;
  try {
    const feed = await parser.parseURL(URLS[channel])
    coronaItems = channel === 'israelHayom'
      && feedFilterTitle(feed)
      || feedFilterTags(feed)
    const news = coronaItems.map(item => ({
      href: item.link,
      title: item.title,
      description: item.contentSnippet || item.description || stripHtml(item.content),
      date: item.pubDate,
      image: item.image || getImg(item.content)
    }))
    return news

  } catch(e) {
    console.log('Error: ', e);
    return null
  }
}

module.exports = getNews

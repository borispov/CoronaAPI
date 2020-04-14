const express = require('express');
const Router = express.Router();
const {
  single,
  worldOverTime,
  todayCountry,
  getCountries,
  getResources,
  getNewsHeb,
  donateStream,
  receiveDonationMessages,
  worldYesterday
} = require('./controllers');

Router.get('/api/v1/yesterday', worldYesterday)

Router.get('/api/v1/alltime/', worldOverTime)

Router.get('/api/v1/alltime/:country', single)

Router.get('/api/v1/today/:country', todayCountry)

Router.get('/api/v1/countries', getCountries)

Router.get('/api/data/resources', getResources)

Router.get('/api/v1/news/heb', getNewsHeb)

Router.post('/api/donate/', donateStream)

Router.get('/api/donate/', receiveDonationMessages)


// Router.get('/v1/news/eng', getNews)

module.exports = Router

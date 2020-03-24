const express = require('express');
const Router = express.Router();
const { single, worldOverTime, todayCountry, getCountries, getResources } = require('./controllers');

Router.get('/v1/alltime/', worldOverTime)

Router.get('/v1/alltime/:country', single)

Router.get('/v1/today/:country', todayCountry)

Router.get('/v1/countries', getCountries)

Router.get('/data/resources', getResources)


module.exports = Router

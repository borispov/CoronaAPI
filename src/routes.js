const express = require('express');
const Router = express.Router();
const { single, worldOverTime, todayCountry } = require('./controllers');

Router.get('/v1/alltime/', worldOverTime)

Router.get('/v1/alltime/:country', single)

Router.get('/v1/today/:country', todayCountry)


module.exports = Router

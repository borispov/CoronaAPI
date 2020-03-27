const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const app = express();

if (process.env.NODE_ENV === 'production') {
  app.enable('view cache');
}

app.enable('trust proxy');
app.disable('x-powered-by');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/coffee-break', (req, res, next) => {
  res.send('Thanks, this feature will be added soon ... Much Appreciated')
})

app.use('/api', routes)

// app.use('*', (req,res,next) => {
//   res.status(404).send('Not Found');
// })

module.exports = app

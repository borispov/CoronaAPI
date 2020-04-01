const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();


if (process.env.NODE_ENV === 'production') {
  app.enable('view cache');
}

app.use(cors());
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', routes)

app.use('*', (req,res,next) => {
  res.redirect('/')
})

module.exports = app

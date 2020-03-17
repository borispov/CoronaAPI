const path = require('path');
const app = require('./src/app');
const mongoose = require('mongoose');
const http = require('http');
require('dotenv').config();

const port = process.env.PORT || 3003;
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// process.env.PORT ::: ${process.env.PORT}
console.log(`
  process.env.PORT ::: ${port}
`)

mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MONGODB: Connected"))
  .catch(e => console.log("MONGODB: FAILED \n", e));

const server = http.createServer(app);
server.listen(port);

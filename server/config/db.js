const mongoose = require('mongoose');
const keys = require('../config/keys');

mongoose.connect(
  keys.mongoURI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) return console.log(`MONGO DB ERR CONEXION:\n${err}`.brightRed);
    return console.log('MONGO DB CONEXION EXITOSA');
  }
);

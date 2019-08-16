const debug = require('debug')('mongoose');
const mongoose = require('mongoose');

const { mongoUri } = require('../config');

mongoose.connect(mongoUri, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  debug('MongoDB Connected');
});

module.exports = mongoose;

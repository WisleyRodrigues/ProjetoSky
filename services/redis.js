const Redis = require('ioredis');

const { redisPort, redisHost, redisPassword } = require('../config');

const options = {
  port: redisPort,
  host: redisHost,
  password: redisPassword,
};

const redis = new Redis({ ...options });

module.exports = redis;

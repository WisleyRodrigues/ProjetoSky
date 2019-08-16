const fs = require('fs');

require('dotenv').config();

const config = {};

config.env = process.env.NODE_ENV || 'development';
config.appName = process.env.APP_NAME || 'app';
config.port = process.env.PORT || 3000;

config.mongoUri = process.env.MONGO_URI || 'mongodb://localhost/sky';

config.jwtPriKey = process.env.JWT_PRIMARY_KEY || fs.readFileSync('./tests/certificates/priKey.pem').toString();
config.jwtPubKey = process.env.JWT_PUBLIC_KEY || fs.readFileSync('./tests/certificates/pubKey.pem').toString();
config.jwtAccessTokenExpirySeconds = process.env.JWT_ACCESS_TOKEN_EXPIRY_SECONDS
  ? parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY_SECONDS, 10) : 1800;

config.redisHost = process.env.REDIS_HOST || '127.0.0.1';
config.redisPort = process.env.REDIS_PORT || '6379';
config.redisPassword = process.env.REDIS_PWD;

module.exports = config;

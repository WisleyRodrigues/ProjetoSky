const JWT = require('jsonwebtoken');

const { TokenExpired } = require('../classes/Errors');

const redis = require('../services/redis');

const {
  jwtPriKey,
  jwtPubKey,
  jwtAccessTokenExpirySeconds,
} = require('../config');

const options = { algorithm: 'RS256', expiresIn: `${jwtAccessTokenExpirySeconds / 60}m` };

async function generateToken(user) {
  const payload = {
    usuario: user,
  };

  const cert = jwtPriKey;

  const token = JWT.sign(payload, cert, options);

  redis.set(user.uuid, token, 'EX', jwtAccessTokenExpirySeconds);

  return token;
}

async function decodeToken(token) {
  const cert = jwtPubKey;
  try {
    const decoded = await JWT.verify(token, cert, options);
    if (decoded) {
      return decoded.usuario;
    }
    return decoded;
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw new TokenExpired();
    }
    return false;
  }
}

async function getToken(user) {
  const tokenFinded = await redis.get(user.uuid);

  if (!tokenFinded) {
    const token = generateToken(user);
    return token;
  }

  return tokenFinded;
}

module.exports = { generateToken, decodeToken, getToken };

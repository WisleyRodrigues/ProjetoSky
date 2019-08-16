const redis = require('../services/redis');
const { ForbiddenAccess } = require('../classes/Errors');

const Usuario = require('../models/usuario');

exports.getUserById = async (req) => {
  const { id } = req.params;
  const { token } = req;
  const redisResult = await redis.get(id);

  // Valida se o uuid e o token são da mesma pessoa.
  if (redisResult !== token) {
    throw new ForbiddenAccess();
  }

  const result = await Usuario.findOne({ uuid: id })

  return result;
};

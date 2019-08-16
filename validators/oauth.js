const { celebrate, Joi } = require('celebrate');

const i18n = require('../i18n/joi');

const objTelefones = {
  numero: Joi.number().required(),
  ddd: Joi.number().required(),
};

const signUp = celebrate({
  body: {
    nome: Joi.string().required(),
    senha: Joi.string().required(),
    email: Joi.string().required(),
    telefones: Joi.array().items(Joi.object(objTelefones)).required(),
  },
}, {
  language: i18n,
  abortEarly: false,
});

const signIn = celebrate({
  body: {
    email: Joi.string().required(),
    senha: Joi.string().required(),
  },
}, {
  language: i18n,
  abortEarly: false,
});

module.exports = { signUp, signIn };

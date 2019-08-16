const express = require('express');

const router = express.Router();

const apiV1Route = require('./api');

module.exports = () => {
  router.get('/', (req, res) => {
    res.json({ mensagem: 'Bem vindo.' });
  });

  router.use('/api/', apiV1Route);

  return router;
};

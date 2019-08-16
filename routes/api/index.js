const express = require('express');

const router = express.Router();

const usuarioRoute = require('./usuario');

// middleware that is specific to this router
router.use((req, res, next) => {
  next();
});

router.get('/', (req, res) => {
  res.json({ mensagem: 'API' });
});

router.use('/usuario', usuarioRoute);

module.exports = router;

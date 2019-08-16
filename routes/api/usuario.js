const express = require('express');

const router = express.Router();

const passportService = require('../../services/passport');

const usuarioController = require('../../controllers/usuario');

// const {
//   create,
//   update,
//   trocarSenha,
//   userChangePassword,
// } = require('../../validators/usuario');

router.use(passportService.initialize);
router.use(passportService.isAuthenticated);

router.get('/:id', async (req, res, next) => {
  try {
    const user = await usuarioController.getUserById(req);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

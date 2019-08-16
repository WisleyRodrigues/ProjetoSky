const express = require('express');

const router = express.Router();

const oauthController = require('../controllers/oauth');

const { signUp, signIn } = require('../validators/oauth');

router.post('/sign-up', signUp, async (req, res, next) => {
  try {
    const oauth = await oauthController.signUp(req, res);
    res.json(oauth);
  } catch (err) {
    next(err);
  }
});

router.post('/sign-in', signIn, async (req, res, next) => {
  try {
    const oauth = await oauthController.signIn(req, res);
    res.json(oauth);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

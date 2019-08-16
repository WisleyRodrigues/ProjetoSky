/* eslint-disable no-console */
const { AppError, DefaultError } = require('../classes/Errors');
const { env } = require('../config');

function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  let errStatus = err.status || 500;
  let { message } = err;
  let validation;

  if (err.joi && err.joi.isJoi && err.joi.name === 'ValidationError') {
    errStatus = 400;
    validation = err.joi.details;
    message = err.joi.name;
  }

  res.status(errStatus);

  if (err instanceof AppError || (err.joi && err.joi.isJoi)) {
    res.json({ success: false, mensagem: message, validation });
  } else {
    const error = new DefaultError();
    res.json({ success: false, mensagem: error.message });
  }

  if (env === 'development') {
    console.error(err);
  }

  next();
}

module.exports = errorHandler;

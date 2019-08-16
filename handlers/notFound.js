const { NotFound } = require('../classes/Errors');

function notFoundHandler(req, res, next) {
  const err = new NotFound();
  err.status = 404;
  next(err);
}

module.exports = notFoundHandler;

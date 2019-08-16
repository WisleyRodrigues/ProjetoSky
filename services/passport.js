const passport = require('passport');

const { Strategy: BearerStrategy } = require('passport-http-bearer');

const { ForbiddenAccess } = require('../classes/Errors');

const { decodeToken } = require('./jwt');

passport.use(new BearerStrategy(async (token, next) => {
  try {
    const user = await decodeToken(token);

    return next(null, user);
  } catch (error) {
    console.log('AAAAAAAAAAAAAA')
    console.log(error)
    return next(error);
  }

}));

exports.initialize = passport.initialize();

exports.isAuthenticated = (req, res, next) => {
  passport.authenticate(['bearer'], { session: false }, (err, user) => {
    if (err || !user || !Object.keys(user).length) {
      if (!err) {
        return next(new ForbiddenAccess());
      }
      return next(err);
    }
    req.user = user;
    return next();
  })(req, res, next);
};

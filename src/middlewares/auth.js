const passport = require('passport');
const createError = require('http-errors');

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAuthenticated = false;
    return next();
  }

  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(createError(err));
    }

    if (!user) {
      req.isAuthenticated = false;
      return next();
    }

    req.user = user;
    req.isAuthenticated = true;
    next();
  })(req, res, next);
};

module.exports = { isAuth };

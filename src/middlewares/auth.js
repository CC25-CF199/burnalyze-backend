const passport = require('passport');
const createError = require('http-errors');

const isAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAuthenticated = false;
    return next();
  }

  passport.authenticate('jwt', { session: false })(req, res, next);
};

module.exports = { isAuth };

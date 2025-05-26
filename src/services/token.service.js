const jwt = require('jsonwebtoken');

const issueJwt = user => {
  const id = user.id;
  const expiresIn = '1d';
  const secret = process.env.JWT_SECRET;

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, secret, {
    expiresIn: expiresIn,
  });

  return {
    token: signedToken,
    expiresIn: expiresIn,
  };
};

module.exports = { issueJwt };

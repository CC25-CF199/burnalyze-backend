const jwt = require('jsonwebtoken');

const issueJwt = user => {
  const id = user.id;
  const secret = process.env.JWT_SECRET;

  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, secret);

  return {
    token: signedToken,
  };
};

module.exports = { issueJwt };

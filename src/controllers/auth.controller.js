const { userService } = require('../services');

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.getUserByEmail(email);

  if (user) {
    return res.status(400).json({ message: 'Email already registered.' });
  }

  return res.status(200).json({ message: 'Successfully registered.' });
};

module.exports = {
  register,
};

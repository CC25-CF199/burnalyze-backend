const UserModel = require('../models/user.model');
const { signUpSchema } = require('../validations/auth.validation');

// TO-DO improve error handling
const register = async (req, res) => {
  try {
    const { error, value } = signUpSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      console.error(error);
      return res.status(500).json(error.details);
    }

    const isEmailTaken = await UserModel.getUserByEmail(value.email);
    const isUsernameTaken = await UserModel.getUserByUsername(value.username);

    if (isEmailTaken.data.length > 0) {
      return res.status(400).json({ message: 'Email already registered.' });
    } else if (isUsernameTaken.data.length > 0) {
      return res
        .status(400)
        .json({ message: 'Username is taken or already registered' });
    }

    const createdUser = await UserModel.createUser(value);
    return res
      .status(201)
      .json({ ...createdUser, message: 'Account successfully registered.' });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {};

module.exports = {
  register,
  login,
};

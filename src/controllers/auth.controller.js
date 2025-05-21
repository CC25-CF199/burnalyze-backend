const UserModel = require('../models/user.model');
const createError = require('http-errors');

const register = async (req, res, next) => {
  try {
    const value = req.body;

    const isEmailTaken = await UserModel.getUserByEmail(value.email);
    const isUsernameTaken = await UserModel.getUserByUsername(value.username);

    if (isUsernameTaken.data.length > 0) {
      return next(createError(400, 'Username is taken or already registered'));
    } else if (isEmailTaken.data.length > 0) {
      return next(createError(400, 'Email already registered.'));
    }

    const dbResponse = await UserModel.createUser(value);
    return res.status(201).json({
      error: false,
      message: 'Account successfully registered.',
      createdUser: dbResponse.data,
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(500, 'An unexpected error occured'));
  }
};

const login = async (req, res) => {};

module.exports = {
  register,
  login,
};

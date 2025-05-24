const createError = require('http-errors');

const UserModel = require('../models/user.model');
const authService = require('../services');
const { issueJwt } = require('../services/token.service');

const register = async (req, res, next) => {
  try {
    const user = await authService.authService.registerUser(req.body);

    return res.status(201).json({
      error: false,
      message: 'Account successfully registered.',
      createdUser: user,
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userData = await authService.authService.validateEmailAndPassword(
      email,
      password
    );
    const loginToken = issueJwt(userData);

    return res.status(200).json({
      error: false,
      message: 'User authenticated successfully',
      loginResult: {
        userId: userData.id,
        username: userData.username,
        ...loginToken,
      },
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

module.exports = {
  register,
  login,
};

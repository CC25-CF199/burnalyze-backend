const createError = require('http-errors');

const UserModel = require('../models/user.model');
const { verifyPassword } = require('../utils/userPassword');
const { issueJwt } = require('../services/token.service');

const register = async (req, res, next) => {
  try {
    const { data: isEmailTaken } = await UserModel.getUserByEmail(
      req.body.email
    );
    const { data: isUsernameTaken } = await UserModel.getUserByUsername(
      req.body.username
    );

    // Check if username or email is available
    if (isUsernameTaken) {
      return next(createError(400, 'Username is taken or already registered'));
    } else if (isEmailTaken) {
      return next(createError(400, 'Email already registered.'));
    }

    // Write user to db
    const dbResponse = await UserModel.createUser(req.body);
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

const login = async (req, res, next) => {
  try {
    // Query user based on email from db
    const { data: userData } = await UserModel.getUserByEmail(req.body.email);

    if (!userData) {
      return next(createError(400, 'Could not find user'));
    }

    // Check is password match
    const isPasswordMatch = await verifyPassword(
      req.body.password,
      userData.password_hash
    );

    if (!isPasswordMatch) {
      return next(createError(400, 'Incorrect email or password'));
    }

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
    return next(createError(500, 'An unexpected error occured'));
  }
};

module.exports = {
  register,
  login,
};

const createError = require('http-errors');
const UserModel = require('../models/user.model');
const { verifyPassword, hashPassword } = require('../utils/userPassword');

const registerUser = async ({
  username,
  firstname,
  lastname,
  email,
  password,
}) => {
  const { data: isUsernameTaken } = await UserModel.getUserByUsername(username);
  const { data: isEmailTaken } = await UserModel.getUserByEmail(email);

  // Check if username or email is available
  if (isUsernameTaken) {
    throw createError(400, 'Username is taken or already registered');
  } else if (isEmailTaken) {
    throw createError(400, 'Email already registered.');
  }

  const { hash, salt } = hashPassword(password);

  const userData = {
    username: username,
    firstname: firstname,
    lastname: lastname,
    email: email,
    password_hash: hash,
    password_salt: salt,
  };

  // Write user to db
  const dbResponse = await UserModel.createUser(userData);

  return dbResponse.data;
};

const validateEmailAndPassword = async (email, userInputPassword) => {
  const { data: userData } = await UserModel.getUserByEmail(email);

  if (!userData) {
    throw createError(400, 'Could not find user with that email');
  }

  const isPasswordMatch = await verifyPassword(
    userInputPassword,
    userData.password_hash
  );

  if (!isPasswordMatch) {
    throw createError(401, 'Incorrect password');
  }

  return {
    ...userData,
  };
};

const resetPassword = () => {
  // TO-DO
};

module.exports = {
  registerUser,
  validateEmailAndPassword,
};

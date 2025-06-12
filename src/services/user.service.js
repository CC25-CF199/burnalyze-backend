const createError = require('http-errors');
const { UserModel } = require('../models');

const getUserInformationById = async userId => {
  const { data, error } = await UserModel.getUserById(userId);

  if (!data) {
    throw createError(400, 'Could not find user with that ID');
  }

  if (error) {
    throw createError(error);
  }

  return data;
};

module.exports = {
  getUserInformationById,
};

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

const deleteUserAccountById = async userId => {
  // Get user storage img path
  const { data: userHistories, error: userHistoriesErr } =
    await UserModel.getAllUserHistories(userId);

  if (userHistoriesErr) throw createError(userHistoriesErr);

  // Remove list of image paths
  if (userHistories && userHistories.length > 0) {
    const imagePaths = userHistories.map(history => history.image_path);
    const { error: storageErr } = await UserModel.deleteUserStorage(imagePaths);

    if (storageErr) throw createError(storageErr);
  }

  // Delete user histories
  const { error: deleteUserHistoriesErr } =
    await UserModel.deleteUserHistories(userId);

  if (deleteUserHistoriesErr) throw createError(deleteUserHistoriesErr);

  // Delete user account
  const { error: deleteUserAccountErr } =
    await UserModel.deleteUserAccount(userId);

  if (deleteUserAccountErr) throw createError(deleteUserAccountErr);

  return true;
};

module.exports = {
  getUserInformationById,
  deleteUserAccountById,
};

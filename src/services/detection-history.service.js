const createError = require('http-errors');
const { UserModel } = require('../models');
const { getSignedUrls } = require('../utils/getSignedUrls');

const getAuthenticatedUserHistories = async userId => {
  const { data, error } = await UserModel.getAllUserHistories(userId);

  if (error) {
    throw createError(error.message);
  }

  if (data.length === 0) {
    return 'No record found for this user';
  }

  // Get signed url for each image path
  const historiesWithUrls = await getSignedUrls(data);

  return historiesWithUrls;
};

const getSingleUserHistory = async id => {
  const { data, error } = await UserModel.getHistoryById(id);

  if (error) {
    throw createError(error.message);
  }

  if (data.length === 0) {
    return 'No record found for this user';
  }

  // Get signed url for each image path
  const signedUrl = await getSignedUrls(data);

  const { image_path: excluded, ...rest } = data;
  return {
    ...rest,
    image_url: signedUrl,
  };
};

module.exports = { getSingleUserHistory, getAuthenticatedUserHistories };

const createError = require('http-errors');
const { UserModel } = require('../models');

const storeAuthenticatedDetection = async detectionData => {
  const dbResponse = await UserModel.storeUserDetectionData(detectionData);

  return dbResponse;
};

const getAuthenticatedDetection = async () => {
  // TO-DO
};

module.exports = { storeAuthenticatedDetection };

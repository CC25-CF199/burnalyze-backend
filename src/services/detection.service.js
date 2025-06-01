const createError = require('http-errors');
const { DetectionModel } = require('../models');

const storeAuthenticatedDetection = async detectionData => {
  // TO-DO: store image url to supabase storage
  // const imgUrl = await DetectionModel.storeWoundImage(
  //   detectionData.uploadedImage
  // );
  const storedDetectionData =
    await DetectionModel.storeUserDetectionData(detectionData);
};

const getAuthenticatedDetection = async () => {
  // TO-DO
};

module.exports = { storeAuthenticatedDetection };

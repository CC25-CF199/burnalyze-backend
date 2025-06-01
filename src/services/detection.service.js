const { DetectionModel } = require('../models');

const storeAuthenticatedDetection = async detectionData => {
  const userId = detectionData.user_id;
  const uploadedImg = detectionData.uploadedImage;

  // TO-DO: store image url to supabase storage
  const storagePath = await DetectionModel.storeWoundImage(uploadedImg, userId);

  const detectionToStore = {
    ...detectionData,
    image_path: storagePath,
  };

  await DetectionModel.storeUserDetectionData(detectionToStore);
};

const getAuthenticatedDetection = async () => {
  // TO-DO
};

module.exports = { storeAuthenticatedDetection };

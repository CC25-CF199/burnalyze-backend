const { DetectionModel, UserModel } = require('../models');
const { treatments } = require('../constants/treatment_recommendations');

const getMlResponse = async uploadedImage => {
  const mlResponse = await DetectionModel.getPrediction(uploadedImage);
  const treatmentRecommendations = treatments[mlResponse.predicted_class_label];

  const data = {
    body_part: mlResponse.predicted_body_part,
    ...treatmentRecommendations,
    uploadedImage: uploadedImage,
    burn_degree_confidence: mlResponse.burn_degree_confidence,
    body_part_confidence: mlResponse.body_part_confidence,
  };

  return data;
};

const storeAuthenticatedDetection = async detectionData => {
  const userId = detectionData.user_id;
  const uploadedImg = detectionData.uploadedImage;

  const storagePath = await DetectionModel.storeWoundImage(uploadedImg, userId);

  const detectionToStore = {
    ...detectionData,
    image_path: storagePath,
  };

  await DetectionModel.storeUserDetectionData(detectionToStore);
};

module.exports = {
  storeAuthenticatedDetection,
  getMlResponse,
};

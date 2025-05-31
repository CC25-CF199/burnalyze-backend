const createError = require('http-errors');
const { detectionService } = require('../services');
const { MachineLearningModel } = require('../models');
const { treatments } = require('../constants/treatment_recommendations');

const predict = async (req, res, next) => {
  try {
    const uploadedImage = req.file;

    if (!uploadedImage) {
      throw createError(400, 'No image file uploaded');
    }

    const mlResponse = await MachineLearningModel.getPrediction(uploadedImage);
    const treatmentRecommendations =
      treatments[mlResponse.predicted_class_label];

    if (req.isAuthenticated) {
      // TO-DO store detection history data when authenticated
      const detectionData = {
        user_id: req.user.data.id,
        woundClass: treatmentRecommendations.class,
        desc: treatmentRecommendations.desc,
        treatments: treatmentRecommendations.treatments,
      };

      const isStoreSuccess =
        await detectionService.storeAuthenticatedDetection(detectionData);

      console.log(isStoreSuccess);
    }

    return res.status(200).json({
      error: false,
      message: treatmentRecommendations,
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

module.exports = { predict };

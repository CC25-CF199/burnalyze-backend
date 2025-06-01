const createError = require('http-errors');
const fs = require('fs').promises;
const { detectionService } = require('../services');
const { DetectionModel } = require('../models');
const { treatments } = require('../constants/treatment_recommendations');

const predict = async (req, res, next) => {
  try {
    const uploadedImage = req.file;

    if (!uploadedImage) {
      throw createError(400, 'No image file uploaded');
    }

    const mlResponse = await DetectionModel.getPrediction(uploadedImage);
    const treatmentRecommendations =
      treatments[mlResponse.predicted_class_label];

    // Handle authenticated user
    if (req.isAuthenticated) {
      const detectionData = {
        user_id: req.user.id,
        woundClass: treatmentRecommendations.class,
        desc: treatmentRecommendations.desc,
        treatments: treatmentRecommendations.treatments,
        uploadedImage: uploadedImage,
      };

      await detectionService.storeAuthenticatedDetection(detectionData);
    }

    // Delete local file after storing data to DB
    await fs.unlink(uploadedImage.path);

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

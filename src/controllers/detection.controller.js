const createError = require('http-errors');
const fs = require('fs').promises;
const { detectionService } = require('../services');

const predict = async (req, res, next) => {
  try {
    const uploadedImage = req.file;

    if (!uploadedImage) {
      throw createError(400, 'No image file uploaded');
    }

    const mlResponse = await detectionService.getMlResponse(uploadedImage);

    // Handle authenticated user
    if (req.isAuthenticated) {
      const detectionData = {
        user_id: req.user.id,
        ...mlResponse,
      };
      await detectionService.storeAuthenticatedDetection(detectionData);
    }

    // Delete local file after storing data to DB
    await fs.unlink(uploadedImage.path);

    const { body_part, woundClass, desc, treatments } = mlResponse;
    return res.status(200).json({
      error: false,
      message: {
        body_part,
        woundClass,
        desc,
        treatments,
      },
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

module.exports = { predict };

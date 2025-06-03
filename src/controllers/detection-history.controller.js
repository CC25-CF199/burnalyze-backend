const createError = require('http-errors');
const { detectionHistoryService } = require('../services');

const getAllUserHistories = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const response =
      await detectionHistoryService.getAuthenticatedUserHistories(userId);

    res.status(200).json({
      error: false,
      message: response,
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

const getUserHistoryDetails = async (req, res, next) => {
  try {
    const historyId = req.params.id;

    const response =
      await detectionHistoryService.getSingleUserHistory(historyId);

    res.status(200).json({
      error: false,
      message: response,
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

module.exports = { getAllUserHistories, getUserHistoryDetails };

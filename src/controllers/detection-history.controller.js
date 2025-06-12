const createError = require('http-errors');
const { detectionHistoryService } = require('../services');

const getAllUserHistories = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const response =
      await detectionHistoryService.getAuthenticatedUserHistories(userId);

    if (response.length === 0) {
      return res.status(200).json({
        error: false,
        message: 'No record found for this user',
        userHistories: [],
      });
    }

    return res.status(200).json({
      error: false,
      message: 'Records fetch success',
      userHistories: response,
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

    return res.status(200).json({
      error: false,
      message: response,
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

const deleteUserHistory = async (req, res, next) => {
  try {
    const historyId = req.params.id;

    const response =
      await detectionHistoryService.deleteSingleHistory(historyId);

    return res.status(200).json({
      error: false,
      message: response,
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

module.exports = {
  getAllUserHistories,
  getUserHistoryDetails,
  deleteUserHistory,
};

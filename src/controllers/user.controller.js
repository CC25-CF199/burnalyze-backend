const createError = require('http-errors');
const { userService } = require('../services');

const getUserInfo = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await userService.getUserInformationById(userId);

    return res.status(200).json({
      error: false,
      message: user,
    });
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

const deleteUserAccount = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const isSuccess = await userService.deleteUserAccountById(userId);

    if (isSuccess) {
      return res.status(200).json({
        error: false,
        message: 'User account removed successfully',
      });
    }
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

module.exports = {
  getUserInfo,
  deleteUserAccount,
};

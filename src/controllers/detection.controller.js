const createError = require('http-errors');
const { userService } = require('../services');

const predict = async (req, res, next) => {
  try {
  } catch (error) {
    console.error('Unexpected Error:', error.message);
    return next(createError(error));
  }
};

module.exports = { predict };

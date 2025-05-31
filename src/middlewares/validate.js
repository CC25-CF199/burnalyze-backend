const Joi = require('joi');
const createError = require('http-errors');

const validate = schema => {
  return (req, res, next) => {
    const validated = schema.validate(req.body, { abortEarly: false });

    if (validated.error) {
      const errorMsg = validated.error.details
        .map(detail => detail.message)
        .join(', ');

      return next(createError(400, { message: errorMsg }));
    }

    req.body = validated.value;
    next();
  };
};

module.exports = validate;

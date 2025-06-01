const express = require('express');

const { authController } = require('../../controllers');
const {
  signUpSchema,
  loginSchema,
} = require('../../validations/auth.validation');
const validate = require('../../middlewares/validate');

const router = express.Router();
router.post('/register', validate(signUpSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

module.exports = router;

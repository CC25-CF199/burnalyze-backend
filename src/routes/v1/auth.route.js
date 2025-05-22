const express = require('express');

const { authController } = require('../../controllers');
const { signUpSchema } = require('../../validations/auth.validation');
const validate = require('../../middleware/validate');

const router = express.Router();
router.post('/register', validate(signUpSchema), authController.register);
router.post('/login', authController.login);

module.exports = router;

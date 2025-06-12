const express = require('express');
const { userController } = require('../../controllers');
const { isAuth } = require('../../middlewares/auth');

const router = express.Router();
router.post('/:id', isAuth('user'), userController.getUserInfo);

module.exports = router;

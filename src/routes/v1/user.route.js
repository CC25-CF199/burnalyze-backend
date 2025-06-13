const express = require('express');
const { userController } = require('../../controllers');
const { isAuth } = require('../../middlewares/auth');

const router = express.Router();
router.get('/:id', isAuth('user'), userController.getUserInfo);
router.delete('/delete/:id', isAuth('user'), userController.deleteUserAccount);

module.exports = router;

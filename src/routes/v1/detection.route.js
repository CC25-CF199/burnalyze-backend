const express = require('express');
const {
  detectionController,
  detectionHistoryController,
} = require('../../controllers');
const { uploadSingle } = require('../../middlewares/multer');
const { isAuth } = require('../../middlewares/auth');

const router = express.Router();
router.post('/predict', uploadSingle, isAuth, detectionController.predict);
router.get('/history/:id', detectionHistoryController.user_histories);

module.exports = router;

const express = require('express');
const multer = require('multer');
const {
  detectionController,
  detectionHistoryController,
} = require('../../controllers');
const upload = multer({ dest: 'upload/' });

const router = express.Router();
router.post('/predict', detectionController.predict);
router.get('/history/:id', detectionHistoryController.user_histories);

module.exports = router;

const express = require('express');
const {
  detectionController,
  detectionHistoryController,
} = require('../../controllers');
const { uploadSingle } = require('../../middlewares/multer');
const { isAuth } = require('../../middlewares/auth');

const router = express.Router();
router.post(
  '/predict',
  uploadSingle,
  isAuth('predict'),
  detectionController.predict
);
router.get(
  '/histories',
  isAuth('histories'),
  detectionHistoryController.getAllUserHistories
);
router.get(
  '/history/details/:id',
  isAuth('history-details'),
  detectionHistoryController.getUserHistoryDetails
);
router.delete(
  '/history/details/:id',
  isAuth('history-details'),
  detectionHistoryController.deleteUserHistory
);

module.exports = router;

const express = require('express');
const authRoute = require('./auth.route.js');
const detectionRoute = require('./detection.route.js');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/detection', detectionRoute);

module.exports = router;

const express = require('express');
const authRoute = require('./auth.route.js');
const detectionRoute = require('./detection.route.js');
const userRoute = require('./user.route.js');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/detection', detectionRoute);
router.use('/user', userRoute);

module.exports = router;

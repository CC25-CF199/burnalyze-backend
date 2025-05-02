const express = require('express');
const exampleRoute = require('./example.route.js');

const router = express.Router();

router.use('/example', exampleRoute);

module.exports = router;

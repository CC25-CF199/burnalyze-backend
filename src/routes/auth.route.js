const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  // Handle login logic here
  res.send('Login route');
});

module.exports = router;

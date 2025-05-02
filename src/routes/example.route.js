const express = require('express');
const supabase = require('../config/supabase.js');

const router = express.Router();

router.get('/', async (req, res) => {
  const { error, data } = await supabase.from('users').select();

  res.json(data);
});

router.post('/post', async (req, res) => {
  const { username, fullname, email, password_hash } = req.body;

  const { error, data } = await supabase
    .from('users')
    .insert([
      {
        username: username,
        fullname: fullname,
        email: email,
        password_hash: password_hash,
      },
    ])
    .select();

  res.json(data);
});

module.exports = router;

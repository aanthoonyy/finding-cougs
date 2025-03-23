const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    let result = await user.save();

    result = result.toObject();

    res.send(result);
    console.log('User saved:', result);
  } catch (err) {
    console.error('Error in /register:', err);
    res.status(500).send('Something Went Wrong');
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Something Went Wrong');
  }
});

module.exports = router;

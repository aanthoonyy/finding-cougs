// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// REGISTER
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

// POST
router.post('/api/posts', (req, res) => {
  const newPost = {
    id: posts.length + 1,
    text: req.body.text,
  };
  posts.push(newPost);
  res.json(newPost);
});

// GET ALL USERS (for testing)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).send('Something Went Wrong');
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    return res.json({ success: true, user });
  } catch (err) {
    console.error('Error in /login:', err);
    res.status(500).send('Something Went Wrong');
  }
});

module.exports = router;

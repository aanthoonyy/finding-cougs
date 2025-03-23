/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

const User = mongoose.model('users', UserSchema);

User.createIndexes();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('App is Working with sample_mflix DB');
});

app.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    let result = await user.save();

    result = result.toObject();

    if (result.password) {
      delete result.password;
    }

    res.send(result);
    console.log('User saved:', result);
  } catch (err) {
    console.error('Error in /register:', err);
    res.status(500).send('Something Went Wrong');
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Something Went Wrong");
  }
});

mongoose
  .connect(
    'we gotta setup secrets at some point for shit like this',
    {
      dbName: 'sample_mflix',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to sample_mflix database');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });

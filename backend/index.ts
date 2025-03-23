/* eslint-disable @typescript-eslint/no-require-imports */
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes.js');
const config = require('./config.json');

mongoose
  .connect(
    config.MONGO_URI,
    {
      dbName: 'sample_mflix',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to sample_mflix database');
  })
  .catch((err) => {
    console.error('Connection error:', err);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('App is Working with sample_mflix DB');
});

app.use('/', userRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

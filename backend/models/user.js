const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  posts: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now },
    }
  ],
  followers: [
    {
      followerName : {
        type: String
      },
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      default: [],
    }
  ],
  following: [
    {
      followingName : {
        type: String
      },
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users', 
    }
  ],
  aboutMe: {
    type: String,
  },
  major: {
    type: String,
  },
  age: {
    type: Number,
  },
  ethnicity: {
    type: String,
  },
});

UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('users', UserSchema);

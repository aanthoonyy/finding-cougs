const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

mongoose.connect("");

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

app.get("/", (req, resp) => {
  resp.send("App is Working with sample_mflix DB");
});

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();

    result = result.toObject();

    if (result.password) {
      delete result.password;
    }

    resp.send(result);
    console.log("User saved:", result);
  } catch (e) {
    console.error("Error in /register:", e);
    resp.status(500).send("Something Went Wrong");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

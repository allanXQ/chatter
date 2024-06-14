// src/models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  googleId: {
    type: String,
    required: true,
    unique: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);

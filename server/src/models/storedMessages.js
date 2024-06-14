const mongoose = require("mongoose");

const storedMessageSchema = new mongoose.Schema({
  content: String,
  attachments: [
    {
      filename: String,
      contentType: String,
      path: String, // Path where the file is stored, if using file system; or URL if using a service like AWS S3
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("storedMessage", storedMessageSchema);

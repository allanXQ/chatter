const express = require("express");
const messageController = require("../controllers/message");
const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/create",
  upload.array("attachments"),
  messageController.createMessage
);
router.post(
  "/update/:messageId",
  upload.array("attachments"),
  messageController.updateMessage
);
router.post("/send", messageController.sendMessage);

module.exports = router;

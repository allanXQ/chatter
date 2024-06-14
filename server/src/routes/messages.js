const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();

// Post a new custom message
router.post("/", messageController.createMessage);

// Update a custom message
router.put("/:messageId", messageController.updateMessage);

// Send a custom message to a group or individual
router.post("/send", messageController.sendMessage);

module.exports = router;

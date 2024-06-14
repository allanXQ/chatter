const express = require("express");
const groupController = require("../controllers/groupController");
const router = express.Router();

// Create a new group
router.post("/", groupController.createGroup);

// Add a contact to a group
router.post("/:groupId/members", groupController.addMember);

// Remove a contact from a group
router.delete("/:groupId/members/:memberId", groupController.removeMember);

// Get all groups
router.get("/", groupController.getAllGroups);

module.exports = router;

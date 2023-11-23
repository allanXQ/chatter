const router = require("express").Router();

const { clientInitialize, getChats } = require("@controllers");

router.get("/initialize", clientInitialize);
router.get("/chats", getChats);

module.exports = router;

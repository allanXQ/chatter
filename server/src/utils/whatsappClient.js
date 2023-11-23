const qrcode = require("qrcode-terminal");
const fs = require("fs");

const { Client } = require("whatsapp-web.js");
const whatsappClient = new Client();

whatsappClient.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

whatsappClient.on("authenticated", (session) => {
  console.log("AUTHENTICATED", session);
});

whatsappClient.on("auth_failure", (msg) => {
  console.error("AUTHENTICATION FAILURE", msg);
});

whatsappClient.on("ready", () => {
  console.log("Client is ready!");
  whatsappClient.getChats().then((chats) => {
    fs.writeFile(
      "chats.json",
      JSON.stringify(chats, null, 2),
      (err) => err && console.error(err)
    );
    console.log(chats);
  });
});

whatsappClient.on("message", (msg) => {
  if (msg.body == "!ping") {
    msg.reply("pong");
  }
});

whatsappClient.on("disconnected", (reason) => {
  console.log("Client was logged out", reason);
});

module.exports = whatsappClient;

const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const Message = require("../models/Message");

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("WhatsApp client is ready!");
});

client.initialize();

const sendMessage = async (messageId) => {
  let message;
  try {
    message = await Message.findById(messageId).populate("contact");
    const { phoneNumber, content } = message;

    const chatId = phoneNumber.includes("@c.us")
      ? phoneNumber
      : `${phoneNumber}@c.us`;
    await client.sendMessage(chatId, content);

    message.status = "sent";
    await message.save();
  } catch (error) {
    console.error("Failed to send message:", error);
    message.status = "failed";
    await message.save();
  }
};

module.exports = { sendMessage };

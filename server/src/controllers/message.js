const storedMessages = require("../models/storedMessages");
const { client, MessageMedia } = require("../services/whatsapp"); // Import the WhatsApp client and media handling

exports.sendMessage = async (req, res) => {
  const { messageId, recipients } = req.body; // recipients is now an array of IDs
  try {
    const message = await storedMessages.findById(messageId);
    let media;

    // Check if there are attachments and prepare the media
    if (message.attachments && message.attachments.length > 0) {
      media = MessageMedia.fromFilePath(message.attachments[0].path);
    }

    // Loop over each recipient and send the message
    recipients.forEach(async (recipientId) => {
      let chatId = recipientId.includes("-")
        ? `${recipientId}@g.us`
        : `${recipientId}@c.us`;

      if (media) {
        await client.sendMessage(chatId, media, { caption: message.content });
      } else {
        await client.sendMessage(chatId, message.content);
      }
    });

    res
      .status(200)
      .json({ message: "Messages sent successfully", details: message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

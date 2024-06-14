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

exports.createMessage = async (req, res) => {
  const { content } = req.body;
  let attachments = [];

  // Check if there are files uploaded and prepare the attachments
  if (req.files && req.files.length > 0) {
    attachments = req.files.map((file) => ({
      filename: file.originalname,
      contentType: file.mimetype,
      path: file.path,
    }));
  }

  try {
    const newMessage = new CustomMessage({
      content,
      attachments,
    });
    await newMessage.save();
    res.status(201).json({
      success: true,
      message: "Custom message created successfully",
      data: newMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create custom message",
      error: error.message,
    });
  }
};

exports.updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const { content } = req.body;
  let attachments = [];

  // Handle new attachments if there are any
  if (req.files && req.files.length > 0) {
    attachments = req.files.map((file) => ({
      filename: file.originalname,
      contentType: file.mimetype,
      path: file.path,
    }));
  }

  try {
    const updatedMessage = await CustomMessage.findByIdAndUpdate(
      messageId,
      {
        content,
        ...(attachments.length > 0 && { attachments }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedMessage) {
      return res.status(404).json({
        success: false,
        message: "Custom message not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Custom message updated successfully",
      data: updatedMessage,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update custom message",
      error: error.message,
    });
  }
};

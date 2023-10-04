import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

const messages = [
  {
    isMe: false,
    text: "Hello",
    avatar: "A",
    username: "User1",
  },
  {
    isMe: true,
    text: "Hi",
    avatar: "B",
    username: "User2",
  },
  {
    isMe: false,
    text: "How are you?",
    avatar: "A",
    username: "User1",
  },
  {
    isMe: true,
    text: "Fine",
    avatar: "B",
    username: "User2",
  },
];

const Message = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "75vh",
        overflowY: "auto",
      }}
    >
      {/* Sample messages */}
      {messages.map((message, index) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: message.isMe ? "row-reverse" : "row",
            gap: theme.spacing(2),
            mb: 2,
          }}
        >
          <Avatar
            sx={{
              padding: 0,
              margin: 0,
            }}
          >
            {message.avatar}
          </Avatar>
          <Box
            sx={{
              borderRadius: 1,
              bgcolor: "grey.200",
              p: 2,
              minWidth: 100,
              maxWidth: 300,
              minHeight: 20,
            }}
          >
            <Typography>{message.text}</Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Message;

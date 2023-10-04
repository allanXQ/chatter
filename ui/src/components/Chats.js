import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const Chat = ({ text }) => {
  const theme = useTheme();
  return (
    <ListItem
      button
      key={text.username}
      sx={{
        height: 70,
      }}
    >
      <ListItemAvatar>
        <Avatar>{text?.username[0] || text?.avatar}</Avatar>
      </ListItemAvatar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(0),
        }}
      >
        <Typography variant="body1">{text?.username}</Typography>
        <Typography variant="caption">{text?.text}</Typography>
      </Box>
    </ListItem>
  );
};

export default Chat;

import "./App.css";
import React from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Chat from "./components/Chats";
import Message from "./components/Message";

const Text = [
  {
    avatar: "A",
    username: "User1",
    text: "Hello",
  },
  {
    avatar: "B",
    username: "User2",
    text: "Hi",
  },
  {
    avatar: "C",
    username: "User3",
    text: "How are you?",
  },
  {
    avatar: "D",
    username: "User4",
    text: "Fine",
  },
];

function App() {
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={2} sx={{ backgroundColor: "#fff" }}>
        <List>
          {Text.map((text, index) => (
            <Chat text={text} key={index} />
          ))}
        </List>
      </Grid>
      <Grid
        item
        xs={10}
        sx={{
          backgroundColor: "#000",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box width="90%">
          <Message />
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;

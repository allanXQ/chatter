require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { DBConn } = require("./config");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware");

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// Base Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("*", (req, res) => {
  res.status(404).json({ message: messages.urlNotFound });
});

app.use(errorHandler);

// Start server
DBConn(app);

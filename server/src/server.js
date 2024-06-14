require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { DBConn } = require("./config");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middleware");
const session = require("express-session");
const passport = require("passport");
require("./config/passport-setup");
const auth = require("./routes/auth"); // Routes for authentication

const app = express();

// Middlewares
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

// Base Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Auth Routes
app.use("/auth", auth);

app.use("*", (req, res) => {
  res.status(404).json({ message: messages.urlNotFound });
});

app.use(errorHandler);

// Start server
DBConn(app);

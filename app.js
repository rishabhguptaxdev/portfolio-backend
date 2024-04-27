const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//Import all routes
const home = require("./routes/home");

require("dotenv").config();

const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and middlewares
app.use(cookieParser());

app.use(morgan("tiny"));
app.use("/api/v1", home);

module.exports = app;

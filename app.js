const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

//Import all routes
const home = require("./routes/home");
const user = require("./routes/user");
const project = require("./routes/project");
const workexperience = require("./routes/workexperience");

require("dotenv").config();

const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies and middlewares
app.use(cookieParser());

app.use(morgan("tiny"));
app.use("/api/v1", home);
app.use("/api/v1", user);
app.use("/api/v1", project);
app.use("/api/v1", workexperience);

module.exports = app;

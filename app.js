const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(morgan("tiny"));

app.get("/health", (req, res) => {
  console.log("Healthy");
  res.send("Healthy");
});

module.exports = app;

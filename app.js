const express = require("express");
require("dotenv").config();

const app = express();

app.get("/health", (req, res) => {
  console.log("Healthy");
  res.send("Healthy");
});

module.exports = app;

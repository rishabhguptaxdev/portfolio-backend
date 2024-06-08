const mongoose = require("mongoose");

const DatePartsSchema = {
  startYear: Number,
  startMonth: Number,
  startDay: Number,
  endYear: Number,
  endMonth: Number,
  endDay: Number,
};

module.exports = DatePartsSchema;

const mongoose = require("mongoose");
const DatePartsSchema = require("./date");
const user = require("./user");

const institutionEnum = ["SCHOOL", "COLLEGE", "REMOTE"];

const educationSchema = new mongoose.Schema({
  nameOfInstitution: {
    type: String,
    required: [true, "Please provide institution name"],
  },
  locationOfInstitution: {
    type: String,
  },
  durationOfEducation: {
    type: DatePartsSchema,
  },
  typeOfInstitution: {
    type: String,
    enum: institutionEnum,
  },
  degree: {
    type: String,
  },
  grade: {
    type: String,
  },
  description: {
    type: String,
    maxlength: [100, "Max length of description is 100 characters"],
  },
  user: {
    type: user,
    required: [true, "User associated to institution is required"],
  },
});

module.exports = mongoose.model("Education", educationSchema);

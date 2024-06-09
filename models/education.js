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
    required: [true, "Please provide duration of education"],
  },
  typeOfInstitution: {
    type: String,
    enum: institutionEnum,
  },
  degree: {
    type: String,
    required: [true, "Please provide the degree name"],
  },
  grade: {
    type: String,
  },
  description: {
    type: String,
    maxlength: [100, "Max length of description is 100 characters"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User associated to institution is required"],
  },
});

module.exports = mongoose.model("Education", educationSchema);

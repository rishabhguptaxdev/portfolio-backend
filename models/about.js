const mongoose = require("mongoose");
const validator = require("validator");
const user = require("./user");

const skillSchema = new mongoose.Schema({
  skillName: {
    type: String,
  },
  subTechName: {
    type: [String],
  },
  ratings: {
    type: Number,
    min: [0, "Skills ratings can't be less than 0"],
    max: [100, "Skills ratings can't be greater than 100"],
  },
});

const aboutSchema = new mongoose.Schema({
  resumeUrl: {
    type: String,
    validate: [validator.isURL, "Please provide valid resume URL"],
  },
  introductionContent: {
    type: String,
    maxlength: [250, "Max length of introduction content is 250 characters"],
  },
  currentPosition: {
    type: String,
  },
  skills: {
    type: skillSchema,
  },
  dateOfBirth: {
    type: Date,
  },
  yearsOfExperience: {
    type: Number,
  },
  tagline: {
    type: String,
  },
  currentCompany: {
    type: String,
  },
  currentLocation: {
    type: String,
  },
  languagesKnown: {
    type: [String],
  },
  user: {
    type: user,
    required: [true, "User associated to about is required"],
  },
});

module.exports = mongoose.model("About", aboutSchema);

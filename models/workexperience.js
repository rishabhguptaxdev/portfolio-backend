const mongoose = require("mongoose");
const validator = require("validator");
const DatePartsSchema = require("./date");
const User = require("./user");

const employmentTypeEnum = [
  "FULLTIME",
  "PARTTIME",
  "INTERNSHIP",
  "CONTRACT",
  "FREELANCING",
  "SELFEMPLOYED",
];

const workExperienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, "Please provide company name"],
  },
  companyWebsiteURL: {
    type: String,
    validate: [validator.isURL, "Please provide valid URL of company"],
  },
  durationOfWork: {
    type: DatePartsSchema,
  },
  jobDesignation: {
    type: String,
  },
  employmentType: {
    type: String,
    enum: employmentTypeEnum,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    maxlength: [250, "Max length of work experience should be 250 characters"],
  },
  techUsed: {
    type: [String],
  },
  user: {
    type: User,
  },
});

module.exports = mongoose.model("WorkExperience", workExperienceSchema);

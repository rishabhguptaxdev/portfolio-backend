const mongoose = require("mongoose");
const validator = require("validator");
const DatePartsSchema = require("./date");
const User = require("./user");

const projectCategoryEnum = [
  "FRONTEND",
  "BACKEND",
  "FULLSTACK",
  "BLOCKCHAIN",
  "DATASCIENCE",
  "AI",
  "ML",
];

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "Please provide Project name"],
  },
  projectRepositoryURL: {
    type: String,
    validate: [validator.isURL, "Please provide valid URL"],
  },
  projectLiveURL: {
    type: String,
    validate: [validator.isURL, "Please provide valid URL"],
  },
  projectThumbnailURLs: {
    type: [String],
    // validate: [validator.isURL, "Please provide valid URL"],
    required: [true, "Please provide thumbnail for the project"],
  },
  projectDescription: {
    type: String,
    maxLength: [100, "Project description exceeded 100 characters"],
  },
  projectCategory: {
    type: [String],
    enum: projectCategoryEnum,
  },
  dateOfProject: {
    type: DatePartsSchema,
    required: [true, "Please provide the project date"],
  },
  contributers: {
    type: [String],
  },
  techUsed: {
    type: [String],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: [true, "Provide user associated to the project"],
  },
});

module.exports = mongoose.model("Project", ProjectSchema);

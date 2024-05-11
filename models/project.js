const mongoose = require("mongoose");
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
  projectRepositoryURLs: {
    type: String,
  },
  projectLiveURLs: {
    type: String,
  },
  projectThumbnailURLs: {
    type: [String],
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
    type: User,
    required: [true, "Provide user associated to the project"],
  },
});

module.exports = mongoose.model("Project", ProjectSchema);

import mongoose from "mongoose";
import validator from "validator";
import DatePartsSchema from "./date.model.js";

const projectCategoryEnum = [
  "FRONTEND",
  "BACKEND",
  "FULLSTACK",
  "BLOCKCHAIN",
  "DATASCIENCE",
  "AI",
  "ML",
];

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "Please provide Project name"],
  },
  projectRepositoryURL: {
    type: String,
    validate: [validator.isURL, "Please provide a valid URL"],
  },
  projectLiveURL: {
    type: String,
    validate: [validator.isURL, "Please provide a valid URL"],
  },
  projectThumbnailURLs: {
    type: [String],
    required: [true, "Please provide thumbnail for the project"],
  },
  projectDescription: {
    type: String,
    maxlength: [100, "Project description exceeded 100 characters"],
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
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Provide user associated with the project"],
  },
});

export default mongoose.model("Project", projectSchema);

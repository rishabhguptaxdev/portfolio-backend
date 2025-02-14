import mongoose from "mongoose";
import validator from "validator";
import DatePartsSchema from "./date.model.js";

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
    validate: [validator.isURL, "Please provide a valid URL of company"],
  },
  durationOfWork: {
    type: DatePartsSchema,
    required: [true, "Please provide the work experience date"],
  },
  jobDesignation: {
    type: String,
    required: [true, "Please provide the job designation"],
  },
  employmentType: {
    type: String,
    enum: employmentTypeEnum,
    required: [true, "Please provide the employment type"],
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
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Provide user associated with the Work Experience"],
  },
});

export default mongoose.model("WorkExperience", workExperienceSchema);

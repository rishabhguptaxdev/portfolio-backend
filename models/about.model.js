import mongoose from "mongoose";
import validator from "validator";

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
    validate: [validator.isURL, "Please provide a valid resume URL"],
  },
  introductionContent: {
    type: String,
    maxlength: [250, "Max length of introduction content is 250 characters"],
  },
  currentPosition: {
    type: String,
  },
  skills: {
    type: [skillSchema],
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
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "User associated with About is required"],
  },
});

export default mongoose.model("About", aboutSchema);

import mongoose from "mongoose";
import validator from "validator";

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    default: "Anonymous",
  },
  clientMessage: {
    type: String,
    maxlength: [
      100,
      "Max length can't be greater than 100 characters for client message",
    ],
    required: [true, "Please provide client message"],
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
  clientAvatarURL: {
    type: String,
    validate: [validator.isURL, "Please provide a valid URL for client avatar"],
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user associated with the testimonial"],
  },
});

export default mongoose.model("Testimonial", testimonialSchema);

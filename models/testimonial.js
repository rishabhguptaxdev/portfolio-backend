const mongoose = require("mongoose");
const validator = require("validator");
const user = require("./user");

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
    ratings: {
      type: Number,
      min: 0,
      max: 5,
    },
    clientAvatarURL: {
      type: String,
      validate: [validator.isURL, "please provide valid URL for client avatar"],
    },
    user: {
      type: user,
      required: [true, "Please provide user associcated to client"],
    },
  },
});

module.exports = mongoose.model("Testimonial", testimonialSchema);

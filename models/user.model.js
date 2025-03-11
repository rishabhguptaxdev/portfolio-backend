import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    maxlength: [30, "Name length should not exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: [validator.isEmail, "Please provide a valid email"],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    maxlength: [15, "Username length should not exceed 15 characters"],
    minlength: [7, "Username length should not below 7 characters"],
    match: [/^[A-Za-z0-9]+$/, "Username can only contain letters and numbers"],
  },
  isPortfolioLive: {
    type: Boolean,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [5, "Min length of password should be 5"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
  forgotPasswordToken: {
    type: String,
  },
  forgotPasswordExpiry: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// Encrypt password before saving it -- HOOKS
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Create and return JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// Validate the password with password sent by the user
userSchema.methods.isValidPassword = async function (passwordSentByUser) {
  return await bcrypt.compare(passwordSentByUser, this.password);
};

// Generate forgot password token (string)
userSchema.methods.getForgotPasswordToken = function () {
  const forgotPasswordToken = crypto.randomBytes(20).toString("hex");
  // Getting a hash - make sure to get a hash on backend
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(forgotPasswordToken)
    .digest("hex");
  // Set time of token
  this.forgotPasswordExpiry =
    Date.now() + process.env.FORGOT_TOKEN_EXPIRY * 60 * 1000;
  return forgotPasswordToken;
};

export default mongoose.model("User", userSchema);

import About from "../models/about.model.js";
import mongoose from "mongoose";

export const getAllAbouts = async (userId) => {
  return await About.find({ user: userId });
};

export const getAboutById = async (aboutId, userId) => {
  return await About.findOne({
    _id: new mongoose.Types.ObjectId(aboutId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

export const addAbout = async (data, userId) => {
  return await About.create({ ...data, user: userId });
};

export const updateAbout = async (aboutId, data, userId) => {
  return await About.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(aboutId),
      user: new mongoose.Types.ObjectId(userId),
    },
    { $set: data },
    { new: true, runValidators: true }
  );
};

export const deleteAbout = async (aboutId, userId) => {
  return await About.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(aboutId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

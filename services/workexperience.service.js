import WorkExperience from "../models/workexperience.model.js";
import mongoose from "mongoose";

export const getAllWorkExperience = async (userId) => {
  return await WorkExperience.find({ user: userId });
};

export const getWorkExperience = async (workExperienceId, userId) => {
  return await WorkExperience.findOne({
    _id: new mongoose.Types.ObjectId(workExperienceId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

export const addWorkExperience = async (data, userId) => {
  return await WorkExperience.create({ ...data, user: userId });
};

export const updateWorkExperience = async (workExperienceId, data, userId) => {
  return await WorkExperience.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(workExperienceId),
      user: new mongoose.Types.ObjectId(userId),
    },
    { $set: data },
    { new: true, runValidators: true }
  );
};

export const deleteWorkExperience = async (workExperienceId, userId) => {
  return await WorkExperience.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(workExperienceId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

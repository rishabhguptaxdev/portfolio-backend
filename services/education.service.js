import Education from "../models/education.model.js";
import mongoose from "mongoose";

export const getAllEducations = async (userId) => {
  return await Education.find({ user: userId });
};

export const getEducationById = async (educationId, userId) => {
  return await Education.findOne({
    _id: new mongoose.Types.ObjectId(educationId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

export const addEducation = async (data, userId) => {
  return await Education.create({ ...data, user: userId });
};

export const updateEducation = async (educationId, data, userId) => {
  return await Education.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(educationId),
      user: new mongoose.Types.ObjectId(userId),
    },
    { $set: data },
    { new: true, runValidators: true }
  );
};

export const deleteEducation = async (educationId, userId) => {
  return await Education.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(educationId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

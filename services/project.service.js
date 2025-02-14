import Project from "../models/project.model.js";
import mongoose from "mongoose";

export const getAllProjects = async (userId) => {
  return await Project.find({ user: userId });
};

export const getProjectById = async (projectId, userId) => {
  return await Project.findOne({
    _id: new mongoose.Types.ObjectId(projectId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

export const addProject = async (data, userId) => {
  return await Project.create({ ...data, user: userId });
};

export const updateProject = async (projectId, data, userId) => {
  return await Project.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(projectId),
      user: new mongoose.Types.ObjectId(userId),
    },
    { $set: data },
    { new: true, runValidators: true }
  );
};

export const deleteProject = async (projectId, userId) => {
  return await Project.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(projectId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

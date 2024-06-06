const Project = require("../models/project");

const CustomError = require("../utils/CustomErrors");
const mongoose = require("mongoose");

exports.getAllProjects = async (req, res, next) => {
  try {
    const { userId } = req.body ?? "";

    const projects = await Project.find({ user: userId });

    if (!projects.length) {
      return res.json({
        success: false,
        message: `Oops no project found`,
      });
    }

    res.json(projects);
  } catch (error) {
    console.error("Something went wrong while getting Projects from DB", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProjectById = async (req, res, next) => {
  const projectId = req.params.projectid;
  const userId = req.user.id;

  try {
    const project = await Project.findOne({
      _id: new mongoose.Types.ObjectId(projectId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!project) {
      return res.json({
        success: false,
        message: `Project not found`,
      });
    }

    res.json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      `Something went wrong while getting project with id: ${projectId}`,
      error
    );
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.addProject = async (req, res, next) => {
  try {
    const {
      projectRepositoryURLs,
      projectLiveURLs,
      projectThumbnailURLs,
      projectName,
      projectDescription,
      projectCategory,
      contributers,
      techUsed,
      dateOfProject,
    } = req.body;

    const userId = req.user.id;

    if (!projectName || !projectThumbnailURLs || !projectDescription) {
      return next(new CustomError("Few project details not found", 400));
    }

    const addedProject = await Project.create({ ...req.body, user: userId });
    res.json({ success: true, addedProject });
  } catch (error) {
    console.error("Something went wrong while adding Project in DB", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProject = async () => {
  try {
  } catch (error) {}
};

exports.deleteProject = async (req, res, next) => {
  const userId = req.user.id;
  const projectId = req.params.projectid;

  try {
    const deletedProject = await Project.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(projectId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!deletedProject) {
      return res.json({
        success: false,
        message: `Project not found with id: ${projectId} associated to user with id: ${userId}`,
      });
    }

    res.json({
      success: true,
      message: `Project ${
        deletedProject.projectName || ""
      } has been deleted succesfully`,
    });
  } catch (error) {
    console.error(
      `Something went wrong while deleting project with id: ${projectId}`,
      error
    );
    res.json({ success: false, message: error.message });
  }
};

const Project = require("../models/project");

const CustomError = require("../utils/CustomErrors");
const mongoose = require("mongoose");

exports.getAllProjects = async (req, res, next) => {
  try {
    const { userId } = req.body ?? "";

    const projects = await Project.find({ user: userId });

    if (!projects.length) {
      res.json({
        success: false,
        message: `Oops no project found`,
      });
    }

    res.json(projects);
  } catch (error) {
    console.error("Something went wrong while getting Projects from DB", error);
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
      res.json({
        success: false,
        message: `Project not found`,
      });
    }

    res.json(project);
  } catch (error) {
    console.error(
      `Something went wrong while getting project with id: ${projectId}`,
      error
    );
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
    res.json(addedProject);
  } catch (error) {
    console.error("Something went wrong while adding Project in DB", error);
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
      res.json({
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
  }
};

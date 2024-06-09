const Project = require("../models/project");

const mongoose = require("mongoose");

exports.getAllProjects = async (req, res, next) => {
  try {
    const { userId } = req.body ?? "";

    const projects = await Project.find({ user: userId });

    if (!projects.length) {
      return res.status(200).json({
        success: false,
        message: `Oops no project found`,
      });
    }

    res.status(200).json(projects);
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
      return res.status(200).json({
        success: false,
        message: `Project not found`,
      });
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error(
      `Something went wrong while getting project with id: ${projectId}`,
      error
    );
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addProject = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const addedProject = await Project.create({ ...req.body, user: userId });
    res.status(200).json({ success: true, addedProject });
  } catch (error) {
    console.error("Something went wrong while adding Project in DB", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProject = async (req, res, next) => {
  const projectId = req.params.projectid;
  const userId = req.user.id;
  try {
    const updatedProject = await Project.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(projectId),
        user: new mongoose.Types.ObjectId(userId),
      },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true, // returns the updated document
        runValidators: true, // runs validation on the update
      }
    );

    if (!updatedProject) {
      return res.status(200).json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project update successfully",
      updatedProject,
    });
  } catch (error) {
    console.error("Something went wrong while updating Project", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
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
      return res.status(200).json({
        success: false,
        message: `Project not found with id: ${projectId} associated to user with id: ${userId}`,
      });
    }

    res.status(200).json({
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
    res.status(500).json({ success: false, message: error.message });
  }
};

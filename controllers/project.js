const Project = require("../models/project");

const CustomError = require("../utils/CustomErrors");

exports.getAllProjects = async (req, res, next) => {
  try {
    const { userId } = req.body ?? "";

    const projects = await Project.find({ user: userId });
    res.json({ ...projects });
    res.json({ name: "portfolio" });
  } catch (error) {
    console.error("Something went wrong while getting Projects from DB", error);
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

exports.deleteProject = async () => {
  try {
  } catch (error) {}
};

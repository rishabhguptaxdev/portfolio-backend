import * as projectService from "../services/project.service.js";

export const getAllProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const projects = await projectService.getAllProjects(userId);
    if (!projects.length) {
      return res.status(200).json({
        success: false,
        message: "No project found",
      });
    }
    res.status(200).json(projects);
  } catch (error) {
    console.error("Error in getAllProjects controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const { projectid } = req.params;
    const userId = req.user.id;
    const project = await projectService.getProjectById(projectid, userId);
    if (!project) {
      return res.status(200).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({ success: true, project });
  } catch (error) {
    console.error("Error in getProjectById controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addProject = async (req, res) => {
  try {
    const userId = req.user.id;
    const addedProject = await projectService.addProject(req.body, userId);
    res.status(200).json({ success: true, addedProject });
  } catch (error) {
    console.error("Error in addProject controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { projectid } = req.params;
    const userId = req.user.id;
    const updatedProject = await projectService.updateProject(
      projectid,
      req.body,
      userId
    );
    if (!updatedProject) {
      return res.status(200).json({
        success: false,
        message: "Project not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      updatedProject,
    });
  } catch (error) {
    console.error("Error in updateProject controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { projectid } = req.params;
    const userId = req.user.id;
    const deletedProject = await projectService.deleteProject(
      projectid,
      userId
    );
    if (!deletedProject) {
      return res.status(200).json({
        success: false,
        message: `Project not found with id: ${projectid} associated to user with id: ${userId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Project ${
        deletedProject.projectName || ""
      } has been deleted successfully`,
    });
  } catch (error) {
    console.error("Error in deleteProject controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

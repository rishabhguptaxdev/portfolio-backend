import * as workExperienceService from "../services/workexperience.service.js";

export const getAllWorkExperience = async (req, res) => {
  try {
    const userId = req.user.id ?? "";
    const workExperiences = await workExperienceService.getAllWorkExperience(
      userId
    );
    if (!workExperiences.length) {
      return res.status(200).json({
        success: false,
        message: "No work experience found",
      });
    }
    res.status(200).json(workExperiences);
  } catch (error) {
    console.error("Error in getAllWorkExperience controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWorkExperience = async (req, res) => {
  try {
    const { workExperienceId } = req.params;
    const userId = req.user.id;
    const workExperience = await workExperienceService.getWorkExperience(
      workExperienceId,
      userId
    );
    if (!workExperience) {
      return res.status(200).json({
        success: false,
        message: "Work Experience not found",
      });
    }
    res.status(200).json({ success: true, workExperience });
  } catch (error) {
    console.error("Error in getWorkExperience controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addWorkExperience = async (req, res) => {
  try {
    const userId = req.user.id;
    const addedWorkExperience = await workExperienceService.addWorkExperience(
      req.body,
      userId
    );
    res.status(200).json({ success: true, addedWorkExperience });
  } catch (error) {
    console.error("Error in addWorkExperience controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWorkExperience = async (req, res) => {
  try {
    const { workExperienceId } = req.params;
    const userId = req.user.id;
    const updatedWorkExperience =
      await workExperienceService.updateWorkExperience(
        workExperienceId,
        req.body,
        userId
      );
    if (!updatedWorkExperience) {
      return res.status(200).json({
        success: false,
        message: "Work Experience not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Work Experience updated successfully",
      updatedWorkExperience,
    });
  } catch (error) {
    console.error("Error in updateWorkExperience controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteWorkExperience = async (req, res) => {
  try {
    const { workExperienceId } = req.params;
    const userId = req.user.id;
    const deletedWorkExperience =
      await workExperienceService.deleteWorkExperience(
        workExperienceId,
        userId
      );
    if (!deletedWorkExperience) {
      return res.status(200).json({
        success: false,
        message: `Work Experience not found with id: ${workExperienceId} associated to user with id: ${userId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Work Experience for company ${
        deletedWorkExperience.companyName || ""
      } has been deleted successfully`,
    });
  } catch (error) {
    console.error("Error in deleteWorkExperience controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

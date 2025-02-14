import * as educationService from "../services/education.service.js";

export const getAllEducations = async (req, res) => {
  try {
    const userId = req.user.id;
    const educations = await educationService.getAllEducations(userId);
    if (!educations.length) {
      return res.status(200).json({
        success: false,
        message: "No education found",
      });
    }
    res.status(200).json(educations);
  } catch (error) {
    console.error("Error in getAllEducations controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEducationById = async (req, res) => {
  try {
    const { educationid } = req.params;
    const userId = req.user.id;
    const education = await educationService.getEducationById(
      educationid,
      userId
    );
    if (!education) {
      return res.status(200).json({
        success: false,
        message: "Education not found",
      });
    }
    res.status(200).json({ success: true, education });
  } catch (error) {
    console.error("Error in getEducationById controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addEducation = async (req, res) => {
  try {
    const userId = req.user.id;
    const addedEducation = await educationService.addEducation(
      req.body,
      userId
    );
    res.status(200).json({ success: true, addedEducation });
  } catch (error) {
    console.error("Error in addEducation controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { educationid } = req.params;
    const userId = req.user.id;
    const updatedEducation = await educationService.updateEducation(
      educationid,
      req.body,
      userId
    );
    if (!updatedEducation) {
      return res.status(200).json({
        success: false,
        message: "Education not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      updatedEducation,
    });
  } catch (error) {
    console.error("Error in updateEducation controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { educationid } = req.params;
    const userId = req.user.id;
    const deletedEducation = await educationService.deleteEducation(
      educationid,
      userId
    );
    if (!deletedEducation) {
      return res.status(200).json({
        success: false,
        message: `Education not found with id: ${educationid} associated to user with id: ${userId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Education with degree ${deletedEducation.degree || ""} at ${
        deletedEducation.nameOfInstitution
      } has been deleted successfully`,
    });
  } catch (error) {
    console.error("Error in deleteEducation controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

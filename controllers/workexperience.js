const WorkExperience = require("../models/workexperience");

const mongoose = require("mongoose");

exports.getAllWorkExperience = async (req, res, next) => {
  try {
    const { userId } = req.body ?? "";

    const workExperience = await WorkExperience.find({ user: userId });

    if (!workExperience.length) {
      return res.json({
        success: false,
        message: `Oops no work experience found`,
      });
    }

    res.json(workExperience);
  } catch (error) {
    console.error(
      "Something went wrong while getting Work Experience from DB",
      error
    );
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getWorkExperience = async (req, res, next) => {
  const workExperienceId = req.params.workExperienceId;
  const userId = req.user.id;

  try {
    const workExperience = await WorkExperience.findOne({
      _id: new mongoose.Types.ObjectId(workExperienceId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!workExperience) {
      return res.json({
        success: false,
        message: `Work Experience not found`,
      });
    }

    res.json({
      success: true,
      workExperience,
    });
  } catch (error) {
    console.error(
      `Something went wrong while getting Work Experience with id: ${workExperienceId}`,
      error
    );
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addWorkExperience = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const addedWorkExperience = await WorkExperience.create({
      ...req.body,
      user: userId,
    });
    res.json({ success: true, addedWorkExperience });
  } catch (error) {
    console.error(
      "Something went wrong while adding Work Experience in DB",
      error
    );
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateWorkExperience = async (req, res, next) => {
  const workExperienceId = req.params.workExperienceId;
  const userId = req.user.id;
  try {
    const updatedWorkExperienceId = await WorkExperience.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(workExperienceId),
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

    if (!updatedWorkExperienceId) {
      return res.json({
        success: false,
        message: "Work Experience not found",
      });
    }

    res.json({
      success: true,
      message: "Work Experience update successfully",
      updatedWorkExperienceId,
    });
  } catch (error) {
    console.error("Something went wrong while updating Work Experience", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteWorkExperience = async (req, res, next) => {
  const userId = req.user.id;
  const workExperienceId = req.params.workExperienceId;

  try {
    const deletedworkExperience = await WorkExperience.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(workExperienceId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!deletedworkExperience) {
      return res.json({
        success: false,
        message: `Work Experience not found`,
      });
    }

    res.json({
      success: true,
      message: `Work Experience for company ${
        deletedworkExperience.companyName || ""
      } has been deleted succesfully`,
    });
  } catch (error) {
    console.error(
      `Something went wrong while deleting work experience with id: ${workExperienceId}`,
      error
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

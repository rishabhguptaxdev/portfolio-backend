const Education = require("../models/education");

const mongoose = require("mongoose");

exports.getAllEducations = async (req, res, next) => {
  try {
    const { userId } = req.body ?? "";

    const educations = await Education.find({ user: userId });

    if (!educations.length) {
      return res.status(200).json({
        success: false,
        message: `Oops no education found`,
      });
    }

    res.status(200).json(educations);
  } catch (error) {
    console.error(
      "Something went wrong while getting Educations from DB",
      error
    );
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getEducationById = async (req, res, next) => {
  const educationId = req.params.educationid;
  const userId = req.user.id;

  try {
    const education = await Education.findOne({
      _id: new mongoose.Types.ObjectId(educationId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!education) {
      return res.status(200).json({
        success: false,
        message: `Education not found`,
      });
    }

    res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    console.error(
      `Something went wrong while getting education with id: ${educationId}`,
      error
    );
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addEducation = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const addedEducation = await Education.create({
      ...req.body,
      user: userId,
    });
    res.status(200).json({ success: true, addedEducation });
  } catch (error) {
    console.error("Something went wrong while adding Education in DB", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateEducation = async (req, res, next) => {
  const educationId = req.params.educationid;
  const userId = req.user.id;
  try {
    const updatedEducation = await Education.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(educationId),
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

    if (!updatedEducation) {
      return res.status(200).json({
        success: false,
        message: "Education not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Education update successfully",
      updatedEducation,
    });
  } catch (error) {
    console.error("Something went wrong while updating Education", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteEducation = async (req, res, next) => {
  const userId = req.user.id;
  const educationId = req.params.educationid;

  try {
    const deletedEducation = await Education.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(educationId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!deletedEducation) {
      return res.status(200).json({
        success: false,
        message: `Education not found with id: ${educationId} associated to user with id: ${userId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Education with degree ${deletedEducation.degree || ""} at ${
        deletedEducation.nameOfInstitution
      } has been deleted succesfully`,
    });
  } catch (error) {
    console.error(
      `Something went wrong while deleting education with id: ${educationId}`,
      error
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

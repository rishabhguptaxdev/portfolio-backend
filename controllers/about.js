const About = require("../models/about");

const mongoose = require("mongoose");

exports.getAllAbouts = async (req, res, next) => {
  try {
    const { userId } = req.body ?? "";

    const abouts = await About.find({ user: userId });

    if (!abouts.length) {
      return res.status(200).json({
        success: false,
        message: `Oops no about found`,
      });
    }

    res.status(200).json(abouts);
  } catch (error) {
    console.error("Something went wrong while getting Abouts from DB", error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAboutById = async (req, res, next) => {
  const aboutId = req.params.aboutid;
  const userId = req.user.id;

  try {
    const about = await About.findOne({
      _id: new mongoose.Types.ObjectId(aboutId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!about) {
      return res.status(200).json({
        success: false,
        message: `About not found`,
      });
    }

    res.status(200).json({
      success: true,
      about,
    });
  } catch (error) {
    console.error(
      `Something went wrong while getting about with id: ${aboutId}`,
      error
    );
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addAbout = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const addedAbout = await About.create({ ...req.body, user: userId });
    res.status(200).json({ success: true, addedAbout });
  } catch (error) {
    console.error("Something went wrong while adding About in DB", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateAbout = async (req, res, next) => {
  const aboutId = req.params.aboutid;
  const userId = req.user.id;
  try {
    const updatedAbout = await About.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(aboutId),
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

    if (!updatedAbout) {
      return res.status(200).json({
        success: false,
        message: "About not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "About update successfully",
      updatedAbout,
    });
  } catch (error) {
    console.error("Something went wrong while updating About", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteAbout = async (req, res, next) => {
  const userId = req.user.id;
  const aboutId = req.params.aboutid;

  try {
    const deletedAbout = await About.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(aboutId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!deletedAbout) {
      return res.status(200).json({
        success: false,
        message: `About not found with id: ${aboutId} associated to user with id: ${userId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `About ${
        deletedAbout.aboutName || ""
      } has been deleted succesfully`,
    });
  } catch (error) {
    console.error(
      `Something went wrong while deleting about with id: ${aboutId}`,
      error
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

import * as aboutService from "../services/about.service.js";

export const getAllAbouts = async (req, res) => {
  try {
    const userId = req.user.id;
    const abouts = await aboutService.getAllAbouts(userId);
    if (!abouts.length) {
      return res.status(200).json({
        success: false,
        message: "No about found",
      });
    }
    res.status(200).json(abouts);
  } catch (error) {
    console.error("Error in getAllAbouts controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAboutById = async (req, res) => {
  try {
    const { aboutid } = req.params;
    const userId = req.user.id;
    const about = await aboutService.getAboutById(aboutid, userId);
    if (!about) {
      return res.status(200).json({
        success: false,
        message: "About not found",
      });
    }
    res.status(200).json({ success: true, about });
  } catch (error) {
    console.error("Error in getAboutById controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAbout = async (req, res) => {
  try {
    const userId = req.user.id;
    const addedAbout = await aboutService.addAbout(req.body, userId);
    res.status(200).json({ success: true, addedAbout });
  } catch (error) {
    console.error("Error in addAbout controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const { aboutid } = req.params;
    const userId = req.user.id;
    const updatedAbout = await aboutService.updateAbout(
      aboutid,
      req.body,
      userId
    );
    if (!updatedAbout) {
      return res.status(200).json({
        success: false,
        message: "About not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "About updated successfully",
      updatedAbout,
    });
  } catch (error) {
    console.error("Error in updateAbout controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const { aboutid } = req.params;
    const userId = req.user.id;
    const deletedAbout = await aboutService.deleteAbout(aboutid, userId);
    if (!deletedAbout) {
      return res.status(200).json({
        success: false,
        message: `About not found with id: ${aboutid} associated to user with id: ${userId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: "About has been deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteAbout controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

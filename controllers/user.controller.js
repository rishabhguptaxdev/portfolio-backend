import * as userService from "../services/user.service.js";
import { sendToken } from "../utils/sendToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, username } = req.body;
    if (!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: "Name, email, or password is missing",
      });
    }
    const user = await userService.createUser({
      name,
      email,
      password,
      role,
      username,
    });
    sendToken(user, res);
  } catch (error) {
    console.error("Error in signup controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "Email or password is missing",
      });
    }
    const user = await userService.loginUser(email, password);
    sendToken(user, res);
  } catch (error) {
    console.error("Error in login controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    return res.json({
      userDetails: req.user,
      success: true,
    });
  } catch (error) {
    console.error("Error in get user details controller ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserDetails = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await userService.updateUserDetails(email, req.body.userData);
    return res.json({
      user,
      success: true,
    });
  } catch (error) {
    console.error("Error in updating user details ", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

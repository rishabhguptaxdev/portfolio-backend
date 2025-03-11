import express from "express";
import {
  signup,
  login,
  getUserDetails,
  updateUserDetails,
} from "../controllers/user.controller.js";
import { isLoggedIn } from "../middlewares/user.middleware.js";

const router = express.Router();

// Routes for User
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/getUserDetails").get(isLoggedIn, getUserDetails);
router.route("/updateUserDetails").patch(isLoggedIn, updateUserDetails);

export { router as userRoutes };

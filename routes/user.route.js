import express from "express";
import { signup, login } from "../controllers/user.controller.js";

const router = express.Router();

// Routes for User
router.route("/signup").post(signup);
router.route("/login").post(login);

export { router as userRoutes };

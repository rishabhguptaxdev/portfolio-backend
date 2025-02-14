import express from "express";
import {
  getAllAbouts,
  getAboutById,
  addAbout,
  updateAbout,
  deleteAbout,
} from "../controllers/about.controller.js";
import { isLoggedIn, customRole } from "../middlewares/user.middleware.js";

const router = express.Router();

// Routes for About
router
  .route("/about")
  .get(isLoggedIn, customRole("user"), getAllAbouts)
  .post(isLoggedIn, customRole("user"), addAbout);

router
  .route("/about/:aboutid")
  .get(isLoggedIn, customRole("user", "admin"), getAboutById)
  .patch(isLoggedIn, customRole("user"), updateAbout)
  .delete(isLoggedIn, customRole("user"), deleteAbout);

export { router as aboutRoutes };

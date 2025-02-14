import express from "express";
import {
  getAllEducations,
  getEducationById,
  addEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education.controller.js";
import { isLoggedIn, customRole } from "../middlewares/user.middleware.js";

const router = express.Router();

// Routes for Education
router
  .route("/education")
  .get(isLoggedIn, customRole("user"), getAllEducations)
  .post(isLoggedIn, customRole("user"), addEducation);

router
  .route("/education/:educationid")
  .get(isLoggedIn, customRole("user", "admin"), getEducationById)
  .patch(isLoggedIn, customRole("user"), updateEducation)
  .delete(isLoggedIn, customRole("user"), deleteEducation);

export { router as educationRoutes };

import express from "express";
import {
  getAllWorkExperience,
  getWorkExperience,
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} from "../controllers/workexperience.controller.js";
import { isLoggedIn, customRole } from "../middlewares/user.middleware.js";

const router = express.Router();

// Routes for Work Experience
router
  .route("/work-experience")
  .get(isLoggedIn, customRole("user"), getAllWorkExperience)
  .post(isLoggedIn, customRole("user"), addWorkExperience);

router
  .route("/work-experience/:workExperienceId")
  .get(isLoggedIn, customRole("user", "admin"), getWorkExperience)
  .patch(isLoggedIn, customRole("user"), updateWorkExperience)
  .delete(isLoggedIn, customRole("user"), deleteWorkExperience);

export { router as workExperienceRoutes };

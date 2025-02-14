import express from "express";
import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/project.controller.js";
import { isLoggedIn, customRole } from "../middlewares/user.middleware.js";

const router = express.Router();

// Routes for Project
router
  .route("/project")
  .get(isLoggedIn, customRole("user"), getAllProjects)
  .post(isLoggedIn, customRole("user"), addProject);

router
  .route("/project/:projectid")
  .get(isLoggedIn, customRole("user", "admin"), getProjectById)
  .patch(isLoggedIn, customRole("user"), updateProject)
  .delete(isLoggedIn, customRole("user"), deleteProject);

export { router as projectRoutes };

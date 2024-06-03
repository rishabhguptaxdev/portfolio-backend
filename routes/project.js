const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");
const { isLoggedIn, customRole } = require("../middlewares/user");

router
  .route("/project")
  .get(getAllProjects)
  .post(isLoggedIn, customRole("user"), addProject)
  .patch(isLoggedIn, customRole("user"), updateProject)
  .delete(isLoggedIn, customRole("user"), deleteProject);

module.exports = router;

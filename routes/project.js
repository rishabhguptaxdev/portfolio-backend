const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  addProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");

router
  .route("/project")
  .get(getAllProjects)
  .post(addProject)
  .patch(updateProject)
  .delete(deleteProject);

module.exports = router;

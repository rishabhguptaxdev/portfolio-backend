const express = require("express");
const router = express.Router();

const {
  getAllWorkExperience,
  addWorkExperience,
  getWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
} = require("../controllers/workexperience");
const { isLoggedIn, customRole } = require("../middlewares/user");

router
  .route("/work-experience")
  .get(getAllWorkExperience)
  .post(isLoggedIn, customRole("user"), addWorkExperience);

router
  .route("/work-experience/:workExperienceId")
  .get(isLoggedIn, customRole("user", "admin"), getWorkExperience)
  .patch(isLoggedIn, customRole("user"), updateWorkExperience)
  .delete(isLoggedIn, customRole("user"), deleteWorkExperience);

module.exports = router;

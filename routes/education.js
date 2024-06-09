const express = require("express");
const router = express.Router();

const {
  getAllEducations,
  getEducationById,
  addEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/education");
const { isLoggedIn, customRole } = require("../middlewares/user");

router
  .route("/education")
  .get(getAllEducations)
  .post(isLoggedIn, customRole("user"), addEducation);

router
  .route("/education/:educationid")
  .get(isLoggedIn, customRole("user", "admin"), getEducationById)
  .patch(isLoggedIn, customRole("user"), updateEducation)
  .delete(isLoggedIn, customRole("user"), deleteEducation);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getAllAbouts,
  getAboutById,
  addAbout,
  updateAbout,
  deleteAbout,
} = require("../controllers/about");
const { isLoggedIn, customRole } = require("../middlewares/user");

router
  .route("/about")
  .get(getAllAbouts)
  .post(isLoggedIn, customRole("user"), addAbout);

router
  .route("/about/:aboutid")
  .get(isLoggedIn, customRole("user", "admin"), getAboutById)
  .patch(isLoggedIn, customRole("user"), updateAbout)
  .delete(isLoggedIn, customRole("user"), deleteAbout);

module.exports = router;

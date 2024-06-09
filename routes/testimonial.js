const express = require("express");
const router = express.Router();

const {
  getAllTestimonials,
  getTestimonialById,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require("../controllers/testimonial");
const { isLoggedIn, customRole } = require("../middlewares/user");

router
  .route("/testimonial")
  .get(getAllTestimonials)
  .post(isLoggedIn, customRole("user"), addTestimonial);

router
  .route("/testimonial/:testimonialid")
  .get(isLoggedIn, customRole("user", "admin"), getTestimonialById)
  .patch(isLoggedIn, customRole("user"), updateTestimonial)
  .delete(isLoggedIn, customRole("user"), deleteTestimonial);

module.exports = router;

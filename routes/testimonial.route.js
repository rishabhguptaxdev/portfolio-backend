import express from "express";
import {
  getAllTestimonials,
  getTestimonialById,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonial.controller.js";
import { isLoggedIn, customRole } from "../middlewares/user.middleware.js";

const router = express.Router();

// Routes for Testimonial
router
  .route("/testimonial")
  .get(isLoggedIn, customRole("user"), getAllTestimonials)
  .post(isLoggedIn, customRole("user"), addTestimonial);

router
  .route("/testimonial/:testimonialid")
  .get(isLoggedIn, customRole("user", "admin"), getTestimonialById)
  .patch(isLoggedIn, customRole("user"), updateTestimonial)
  .delete(isLoggedIn, customRole("user"), deleteTestimonial);

export { router as testimonialRoutes };

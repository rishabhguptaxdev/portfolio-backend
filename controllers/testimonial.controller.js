import * as testimonialService from "../services/testimonial.service.js";

export const getAllTestimonials = async (req, res) => {
  try {
    const userId = req.user.id;
    const testimonials = await testimonialService.getAllTestimonials(userId);
    if (!testimonials.length) {
      return res.status(200).json({
        success: false,
        message: "No testimonial found",
      });
    }
    res.status(200).json(testimonials);
  } catch (error) {
    console.error("Error in getAllTestimonials controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getTestimonialById = async (req, res) => {
  try {
    const { testimonialid } = req.params;
    const userId = req.user.id;
    const testimonial = await testimonialService.getTestimonialById(
      testimonialid,
      userId
    );
    if (!testimonial) {
      return res.status(200).json({
        success: false,
        message: "Testimonial not found",
      });
    }
    res.status(200).json({ success: true, testimonial });
  } catch (error) {
    console.error("Error in getTestimonialById controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTestimonial = async (req, res) => {
  try {
    const userId = req.user.id;
    const addedTestimonial = await testimonialService.addTestimonial(
      req.body,
      userId
    );
    res.status(200).json({ success: true, addedTestimonial });
  } catch (error) {
    console.error("Error in addTestimonial controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { testimonialid } = req.params;
    const userId = req.user.id;
    const updatedTestimonial = await testimonialService.updateTestimonial(
      testimonialid,
      req.body,
      userId
    );
    if (!updatedTestimonial) {
      return res.status(200).json({
        success: false,
        message: "Testimonial not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      updatedTestimonial,
    });
  } catch (error) {
    console.error("Error in updateTestimonial controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { testimonialid } = req.params;
    const userId = req.user.id;
    const deletedTestimonial = await testimonialService.deleteTestimonial(
      testimonialid,
      userId
    );
    if (!deletedTestimonial) {
      return res.status(200).json({
        success: false,
        message: `Testimonial not found with id: ${testimonialid} associated to user with id: ${userId}`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Testimonial ${
        deletedTestimonial.testimonialName || ""
      } has been deleted successfully`,
    });
  } catch (error) {
    console.error("Error in deleteTestimonial controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

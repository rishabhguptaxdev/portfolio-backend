const Testimonial = require("../models/testimonial");

const mongoose = require("mongoose");

exports.getAllTestimonials = async (req, res, next) => {
  try {
    const { userId } = req.body ?? "";

    const testimonials = await Testimonial.find({ user: userId });

    if (!testimonials.length) {
      return res.status(200).json({
        success: false,
        message: `Oops no testimonial found`,
      });
    }

    res.status(200).json(testimonials);
  } catch (error) {
    console.error(
      "Something went wrong while getting Testimonials from DB",
      error
    );
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.getTestimonialById = async (req, res, next) => {
  const testimonialId = req.params.testimonialid;
  const userId = req.user.id;

  try {
    const testimonial = await Testimonial.findOne({
      _id: new mongoose.Types.ObjectId(testimonialId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!testimonial) {
      return res.status(200).json({
        success: false,
        message: `Testimonial not found`,
      });
    }

    res.status(200).json({
      success: true,
      testimonial,
    });
  } catch (error) {
    console.error(
      `Something went wrong while getting testimonial with id: ${testimonialId}`,
      error
    );
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addTestimonial = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const addedTestimonial = await Testimonial.create({
      ...req.body,
      user: userId,
    });
    res.status(200).json({ success: true, addedTestimonial });
  } catch (error) {
    console.error("Something went wrong while adding Testimonial in DB", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateTestimonial = async (req, res, next) => {
  const testimonialId = req.params.testimonialid;
  const userId = req.user.id;
  try {
    const updatedTestimonial = await Testimonial.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(testimonialId),
        user: new mongoose.Types.ObjectId(userId),
      },
      {
        $set: {
          ...req.body,
        },
      },
      {
        new: true, // returns the updated document
        runValidators: true, // runs validation on the update
      }
    );

    if (!updatedTestimonial) {
      return res.status(200).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial update successfully",
      updatedTestimonial,
    });
  } catch (error) {
    console.error("Something went wrong while updating Testimonial", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteTestimonial = async (req, res, next) => {
  const userId = req.user.id;
  const testimonialId = req.params.testimonialid;

  try {
    const deletedTestimonial = await Testimonial.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(testimonialId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!deletedTestimonial) {
      return res.status(200).json({
        success: false,
        message: `Testimonial not found with id: ${testimonialId} associated to user with id: ${userId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Testimonial ${
        deletedTestimonial.testimonialName || ""
      } has been deleted succesfully`,
    });
  } catch (error) {
    console.error(
      `Something went wrong while deleting testimonial with id: ${testimonialId}`,
      error
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

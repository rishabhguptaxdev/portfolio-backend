import Testimonial from "../models/testimonial.model.js";
import mongoose from "mongoose";

export const getAllTestimonials = async (userId) => {
  return await Testimonial.find({ user: userId });
};

export const getTestimonialById = async (testimonialId, userId) => {
  return await Testimonial.findOne({
    _id: new mongoose.Types.ObjectId(testimonialId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

export const addTestimonial = async (data, userId) => {
  return await Testimonial.create({ ...data, user: userId });
};

export const updateTestimonial = async (testimonialId, data, userId) => {
  return await Testimonial.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(testimonialId),
      user: new mongoose.Types.ObjectId(userId),
    },
    { $set: data },
    { new: true, runValidators: true }
  );
};

export const deleteTestimonial = async (testimonialId, userId) => {
  return await Testimonial.findOneAndDelete({
    _id: new mongoose.Types.ObjectId(testimonialId),
    user: new mongoose.Types.ObjectId(userId),
  });
};

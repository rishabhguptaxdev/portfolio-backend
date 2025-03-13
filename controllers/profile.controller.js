import { getUserDetailsByUsername } from "../services/user.service.js";
import { getAllAbouts } from "../services/about.service.js";
import { getAllWorkExperience } from "../services/workexperience.service.js";
import { getAllTestimonials } from "../services/testimonial.service.js";
import { getAllEducations } from "../services/education.service.js";
import { getAllProjects } from "../services/project.service.js";

export const getProfile = async (req, res) => {
  try {
    const { username } = req.query;

    const user = await getUserDetailsByUsername(username);
    const userId = user._id;

    // Run all DB queries concurrently
    const [aboutData, workExperiences, educationData, testimonials, projects] =
      await Promise.all([
        getAllAbouts(userId),
        getAllWorkExperience(userId),
        getAllEducations(userId),
        getAllTestimonials(userId),
        getAllProjects(userId),
      ]);

    // Assemble the profile object
    const profile = {
      about: aboutData,
      workExperience: workExperiences,
      education: educationData,
      testimonials: testimonials,
      projects: projects,
    };

    // Check if none of the sections have data
    if (
      !aboutData &&
      (!workExperiences || workExperiences.length === 0) &&
      (!educationData || educationData.length === 0) &&
      (!testimonials || testimonials.length === 0) &&
      (!projects || projects.length === 0)
    ) {
      return res.status(200).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Error in getProfile controller", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

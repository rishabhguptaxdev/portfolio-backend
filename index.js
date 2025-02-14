import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectToDB } from "./config/db.js";

// Import routes
import { educationRoutes } from "./routes/education.route.js";
import { projectRoutes } from "./routes/project.route.js";
import { testimonialRoutes } from "./routes/testimonial.route.js";
import { userRoutes } from "./routes/user.route.js";
import { workExperienceRoutes } from "./routes/workexperience.route.js";
import { aboutRoutes } from "./routes/about.route.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("tiny"));

// Routes
app.use("/api/v1", educationRoutes);
app.use("/api/v1", projectRoutes);
app.use("/api/v1", testimonialRoutes);
app.use("/api/v1", userRoutes);
app.use("/api/v1", workExperienceRoutes);
app.use("/api/v1", aboutRoutes);

// Health check route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Rejoice, everything is up and running!",
  });
});

// Start the server
connectToDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`[✓] Server is up and running at PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("[x] Error connecting to the database:", error.message);
    process.exit(1);
  });

export default app;

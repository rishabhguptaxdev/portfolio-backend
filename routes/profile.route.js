import express from "express";
import { getProfile } from "../controllers/profile.controller.js";

const router = express.Router();

router.route("/profile").get(getProfile);

export { router as profileRoutes };

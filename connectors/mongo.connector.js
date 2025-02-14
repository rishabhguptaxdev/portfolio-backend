import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const DB_URL = process.env.DB_URL;
    if (!DB_URL) {
      throw new Error("DB_URL is not defined in the environment variables.");
    }
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[✓] Connected to the database successfully!");
  } catch (error) {
    console.error("[x] Error connecting to the database:", error.message);
    throw error;
  }
};

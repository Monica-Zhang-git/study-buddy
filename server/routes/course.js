import express from "express";
import { Course } from "../db/course-schema.js";

const router = express.Router();

// Create a course
router.post("/", async (req, res) => {
  const coursesToInsert = req.body;
  try {
    const insertedCourses = await Course.insertMany(coursesToInsert);
    return res.status(201).json(insertedCourses);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// Get courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json(error);
  }
});

export default router;

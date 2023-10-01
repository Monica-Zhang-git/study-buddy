import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseNo: {
    type: String,
    required: true,
    unique: true,
  },
  courseName: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    max: 500,
  },
});

const Course = mongoose.model("Course", courseSchema);
export { Course };

const express = require("express");
const router = express.Router();
const {
  submitCourseApplication,
} = require("../controller/TrainingPrograms/CourseApplicationController");

// application for training programs
// all data get
router.get("/application");
// application for training
router.post("/application", submitCourseApplication);
module.exports = router;

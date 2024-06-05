

const express = require("express");
const { createCourseController, getQuizByIdController, deleteCourseController, quizController, enrollCourseController, examForCourseController, getAllCourseController, getCourseByIdController } = require("../controllers/courseController");
const router = express.Router();

router.post("/create", createCourseController);
router.post("/delete", deleteCourseController);
router.put("/enroll", enrollCourseController);
router.put("/examdetails", examForCourseController);
router.get("/getAllcourse", getAllCourseController);
router.get("/course/:id", getCourseByIdController);
router.get("/quiz/:id", getQuizByIdController);
router.post("/quiz", quizController);



module.exports = router;
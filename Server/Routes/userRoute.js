

const express = require("express");
const { loginUserController, signUpUserController, updateCourseStatusControlller, getUserByIdControlller } = require("../controllers/userController");
const router = express.Router();

router.post("/login", loginUserController);
router.post("/signup", signUpUserController);
router.get("/userdetails/:id", getUserByIdControlller);
router.put("/updatecourse", updateCourseStatusControlller);



module.exports = router;
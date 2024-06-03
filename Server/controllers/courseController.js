const courseModel = require("../models/courseModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const quizModel = require("../models/quiz")

exports.deleteCourseController = async (req, res) => {
    try {
        const { email } = req.body;
        const password2 = req.body.password
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "enter valid email to continue"
            })
        }
        if (!password2) {
            return res.status(400).send({
                success: false,
                message: "enter password to continue"
            })
        }
        const existUser = await userModel.findOne({ email });
        // console.log('existUser', existUser)
        if (!existUser) {
            return res.status(400).send({
                success: false,
                message: "Email is not resistered"
            })
        }


        const cmpPass = await bcrypt.compare(password2, existUser.password);
        if (!cmpPass) {
            return res.status(400).send({
                success: false,
                message: "password is incorrect "
            })
        }


        const user = await userModel.findOne({ email });
        const { password, ...info } = user._doc;
        const accessToken = jwt.sign({ id: user._id }, "secretKey1234", { expiresIn: "5d" });
        return res.status(201).send({
            message: "login successful",
            success: true,
            info, accessToken
        })



    } catch (error) {
        console.log('error', error)
        res.status(400).send({
            success: false,
            message: "something went wrong",
            error
        })
    }
}
exports.examForCourseController = async (req, res) => {
    try {
        const { email } = req.body;
        const password2 = req.body.password
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "enter valid email to continue"
            })
        }
        if (!password2) {
            return res.status(400).send({
                success: false,
                message: "enter password to continue"
            })
        }
        const existUser = await userModel.findOne({ email });
        // console.log('existUser', existUser)
        if (!existUser) {
            return res.status(400).send({
                success: false,
                message: "Email is not resistered"
            })
        }


        const cmpPass = await bcrypt.compare(password2, existUser.password);
        if (!cmpPass) {
            return res.status(400).send({
                success: false,
                message: "password is incorrect "
            })
        }


        const user = await userModel.findOne({ email });
        const { password, ...info } = user._doc;
        const accessToken = jwt.sign({ id: user._id }, "secretKey1234", { expiresIn: "5d" });
        return res.status(201).send({
            message: "login successful",
            success: true,
            info, accessToken
        })



    } catch (error) {
        console.log('error', error)
        res.status(400).send({
            success: false,
            message: "something went wrong",
            error
        })
    }
}


exports.createCourseController = async (req, res) => {
    try {
        // console.log('req.body', req.body)
        const { type, name, descrption, thumbnail, price, section } = req.body;

        if (!thumbnail || !name || !price) {
            return res.status(400).send({
                success: false,
                message: "enter valid document to continue"
            })
        }


        const newCourse = new courseModel({ type, name, descrption, thumbnail, price, section })
        await newCourse.save()
        res.status(201).send({
            success: true,
            message: "Course Created successfully   ",
            newCourse
        })
    } catch (error) {
        console.log('error', error)
        res.status(400).send({
            success: false,
            message: "something went wrong while resistering",
            error
        })
    }
}
exports.quizController = async (req, res) => {
    try {
        // console.log('req.body', req.body)
        const { name, course, answer, options } = req.body;

        if (!course || !name || !answer || !options) {
            return res.status(400).send({
                success: false,
                message: "enter valid document to continue"
            })
        }

     
        const newQuiz = new quizModel({ name, course, answer, options })
        await newQuiz.save()
        res.status(201).send({
            success: true,
            message: "quiz Created successfully   ",
            newQuiz
        })
    } catch (error) {
        console.log('error', error)
        res.status(400).send({
            success: false,
            message: "something went wrong while creating quiz",
            error
        })
    }
}
exports.enrollCourseController = async (req, res) => {
    try {
        // console.log('req.body', req.body)
        const { userId, courseId } = req.body;
console.log('userId ,courseId', userId ,courseId)
        if (!userId || !courseId) {
            return res.status(400).send({
                success: false,
                message: "enter valid document to continue"
            })
        }

        const updateCourse = await courseModel.findByIdAndUpdate(courseId,
            {
                $push: {
                    user: {
                        user: userId
                    }
                },
            }, { new: true }).populate("section")
        const updateUser = await userModel.findByIdAndUpdate(userId,
            {
                $push: {
                    course: {
                        course: courseId
                    }
                },
            }, { new: true }).populate('course.course')
        if (updateCourse) {
            return res.status(201).send({
                success: true,
                message: "Course enrolled successfully   ",
                updateCourse, updateUser
            })
        }
        res.status(401).send({
            success: false,
            message: "enrolling failed  ",

        })
    } catch (error) {
        console.log('error', error)
        res.status(400).send({
            success: false,
            message: "something went wrong while resistering",
            error
        })
    }
}
exports.getCourseByIdController = async (req, res) => {
    try {

        const { id } = req.params;

        console.log('id', id)

        const course = await courseModel.findById(id).populate("section");
        if (course) {
            return res.status(201).send({
                success: true,
                message: "course got successfully   ",
                course
            })
        }
        res.status(200).send({
            success: false,
            message: "no course is there "
        })
    } catch (error) {
        console.log('error', error)
        res.status(400).send({
            success: false,
            message: "something went wrong while resistering",
            error
        })
    }
}
exports.getQuizByIdController = async (req, res) => {
    try {

        const { id } = req.params;


        const quiz = await quizModel.find({ course: id }).populate("course");
        if (quiz) {
            return res.status(201).send({
                success: true,
                message: "quiz got successfully   ",
                quiz
            })
        }
        res.status(200).send({
            success: false,
            message: "no quiz is there "
        })
    } catch (error) {
        console.log('error', error)
        res.status(400).send({
            success: false,
            message: "something went wrong while resistering",
            error
        })
    }
}
exports.getAllCourseController = async (req, res) => {
    try {

        const allCourse = await courseModel.find().populate("section");
        if (allCourse) {
            return res.status(201).send({
                success: true,
                message: "all  courses got successfully",
                allCourse
            })
        }

        res.status(401).send({
            success: false,
            message: "no courses are there"
        })
    } catch (error) {
        console.log('error', error)
        res.status(400).send({
            success: false,
            message: "something went wrong while getting the courses",
            error
        })
    }
}





const sectionModel = require("../models/sectionModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const courseModel= require("../models/courseModel")


exports.deleteSectionController = async (req, res) => {
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


exports.createSectionController = async (req, res) => {
    try {
        // console.log('req.body', req.body)
        const { sectionName, subSection, courseId } = req.body;

        if (!sectionName) {
            return res.status(400).send({
                success: false,
                message: "enter valid document to continue"
            })
        }


        const newSection = new sectionModel({ sectionName, subSection })
        const course = await courseModel.findByIdAndUpdate(
            courseId,
            {
                $push: { section: newSection?._id },
            },
            { new: true }
        );
        await newSection.save()
        res.status(201).send({
            success: true,
            message: "Section Created successfully   ",
            newSection
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
exports.getSectionByIdController = async (req, res) => {
    try {
        // console.log('req.body', req.body)
        const { fname, email, lname, password } = req.body;

        if (!lname || !fname || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "enter valid document to continue"
            })
        }

        const existUser = await userModel.find({ email });
        if (existUser.length > 0) {
            return res.status(200).send({
                success: false,
                message: "Email already exist "
            })
        }
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(password, salt);
        const neweUser = new userModel({ name: fname + "" + lname, email, password: newPassword })
        await neweUser.save()
        res.status(201).send({
            success: true,
            message: "user Created successfully   ",
            neweUser
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
exports.getAllSectionController = async (req, res) => {
    try {

        const allCourse = await courseModel.find();
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





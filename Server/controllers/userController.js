const userModel = require("../models/userModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")



exports.loginUserController = async (req, res) => {
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
exports.getUserByIdControlller = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "enter valid email to continue"
            })
        }

        const existUser = await userModel.findById(id).populate('course.course')
        // console.log('existUser', existUser)
        if (!existUser) {
            return res.status(400).send({
                success: false,
                message: "Email is not resistered"
            })
        }

        const { password, ...info } = existUser._doc;
        return res.status(201).send({
            message: "details got successful",
            success: true,
            info
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


// exports.signUpUserController = async (req, res) => {
//     try {
//         console.log('req.body', req.body)
//         const { name, email, password } = req.body;

//         if (!name  || !email || !password) {
//             return res.status(400).send({
//                 success: false,
//                 message: "enter valid document to continue"
//             })
//         }

//         const existUser = await userModel.find({ email });
//         if (existUser.length > 0) {
//             return res.status(200).send({
//                 success: false,
//                 message: "Email already exist "
//             })
//         }
//         const salt = await bcrypt.genSalt(10);
//         const newPassword = await bcrypt.hash(password, salt);
//         const neweUser = new userModel({ name: name +  email, password: newPassword })
//         await neweUser.save()
//         res.status(201).send({
//             success: true,
//             message: "user Created successfully   ",
//             neweUser
//         })
//     } catch (error) {
//         console.log('error', error)
//         res.status(400).send({
//             success: false,
//             message: "something went wrong while resistering",
//             error
//         })
//     }
// }

exports.signUpUserController = async (req, res) => {
    try {
        console.log('req.body', req.body);
        const { name, email, password } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Check if user with the given email already exists
        const existUser = await userModel.findOne({ email });
        if (existUser) {
            return res.status(200).send({
                success: false,
                message: "Email already exists"
            });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user document
        const newUser = new userModel({ 
            name: name,
            email: email, 
            password: hashedPassword 
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).send({
            success: true,
            message: "User created successfully",
            user: newUser
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send({
            success: false,
            message: "Something went wrong while registering",
            error
        });
    }
};
exports.updateCourseStatusControlller = async (req, res) => {
    try {
        // console.log('req.body', req.body)
        const { mark, user, courseId } = req.body;
        if (!mark || !user || !courseId) {
            return res.status(400).send({
                success: false,
                message: "enter valid document to continue"
            })
        }

        const updateUser = await userModel.findOneAndUpdate(
            {
                _id: user,
                course: { $elemMatch: { course: courseId } }
            },
            {
                $set: { "course.$.marks": mark, 'course.$.isQualified': true }
            },
            { new: true }
        );

        if (!updateUser) {
            return res.status(200).send({
                success: false,
                message: "details not updated "
            })
        }

        res.status(201).send({
            success: true,
            message: "user updated successfully   ",
            updateUser
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





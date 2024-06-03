const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    course: [{
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        },
        isQualified: {
            type: Boolean,
            default: false,
        },
        marks: {
            type: Number,
            default: 0,
        },
    }],




}, { timestamps: true })
const model = mongoose.model("User", userSchema)
module.exports = model
const mongoose = require("mongoose")
const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    descrption: {
        type: String,
    },
    thumbnail: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    user: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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
    section: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
    }],





}, { timestamps: true })
const model = mongoose.model("Course", courseSchema)
module.exports = model
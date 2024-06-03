const mongoose = require("mongoose")
const quizSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    options: [{
        option: {
            type: String,
            required: true
        }
    }],
    answer: {
        type: String,
        required: true
    },





}, { timestamps: true })
const model = mongoose.model("Quiz", quizSchema)
module.exports = model
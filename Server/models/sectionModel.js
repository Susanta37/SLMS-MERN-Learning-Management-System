const mongoose = require("mongoose");

// Define the Section schema
const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String,
    },
    sectionImage: {
        type: String,
    },
    subSection: [
        {
            title: { type: String },
            timeDuration: { type: String },
            description: { type: String },
            videoUrl: { type: String },
        }
    ],
});

// Export the Section model
module.exports = mongoose.model("Section", sectionSchema);

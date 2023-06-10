const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    contactNumber: {
        type: Number
    },
    password: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        enum: ["admin", "student", "instructor"]
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile"
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        required: true
    },
    courses: [{
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course"
        }
    }],
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
    }],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    }
})

module.exports = mongoose.model("User", userSchema);
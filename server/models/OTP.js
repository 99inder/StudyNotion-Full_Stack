const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1m',
    }
});

async function sendVerificationEmail(email, otp) {
    try {
        const verificationEmailTemplate = require("../mail/templates/emailVerificationTemplate");
        const mailResponse = await mailSender(email, "Email Verification for StudyNotion", verificationEmailTemplate(otp));
        console.log("Email Sent Successfully: ", mailResponse);

    } catch (error) {
        console.log("Error occured while sending verification email.");
        console.log(error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    console.log("New document saved to database");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model("OTP", otpSchema);
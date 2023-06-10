// IMPORTS
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        //get email from body
        const email = req.body.email;

        //Validation
        if (!email) {
            return res.status(401).json({
                success: false,
                message: "All required fileds much be filled."
            })
        }

        //find if user exist
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User with this email does not exist. SignUp instead."
            })
        }

        //generate token
        const token = crypto.randomBytes(20).toString("hex");

        //update user by adding token and expiration time
        const updatedUser = await User.findOneAndUpdate(
            { email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 5 * 60 * 1000,
            },
            { new: true }
        );

        //create url
        const url = `http://localhost:3000/update-password/${token}`;

        //send password reset email
        mailSender(email, "Password Reset", `Password Reset Link: ${url}`)

        console.log(url);

        //return response
        return res.status(200).json({
            success: true,
            message: "Password reset link sent successfully. Please check your email."
        })

    } catch (error) {

        console.log("Error Occured while sending Reset Password Link.")
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Unable to send password reset link. Please try again."
        })

    }
}

//resetPassword
exports.resetPassword = async (req, res) => {
    try {

        //fetch data: token, password, confirmPassword
        const { token, password, confirmPassword } = req.body;

        //validation
        if (!token || !password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "All the required filed must be filled"
            });
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is not present"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New Password and Confirm Password does not match."
            });
        }

        //get user details from DB using token
        const user = await User.findOne({ token });

        //if no entry - INVALID TOKEN
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "INVALID Token."
            });
        }

        //token expiry check
        if (user.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Password Reset Link Expired."
            });
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update password
        const updatedUser = await User.findOneAndUpdate(
            { token: token },
            {
                password: hashedPassword,
                token: null,
                resetPasswordExpires: null,
            },
            { new: true }
        );
        //return response
        return res.status(200).json({
            success: true,
            message: "Password Reset Successful",
        });

    } catch (error) {

        console.log("Error Occured while Resetting Password.")
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to reset password. Please try again.",
            error: error.message
        });

    }
}
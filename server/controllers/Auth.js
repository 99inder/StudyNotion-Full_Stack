const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const Profile = require("../models/Profile");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//Send OTP
exports.sendotp = async (req, res) => {
    try {
        const { email } = req.body;

        //validate whether email is present
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "All the mandatory fields are must be filled."
            })
        }

        //validate if the email is already registered

        const isUserPresent = await User.findOne({ email });
        if (isUserPresent) {
            return res.status(400).json({
                success: false,
                message: "This account is already registered. Try logging in instead."
            })
        }

        //user not registered: Proceed ahead
        //generate OTP
        let generatedOTP = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        console.log("OTP generated: ", generatedOTP);

        //make sure the generated OTP is unique
        let notUnique = await OTP.findOne({ otp: generatedOTP });

        while (notUnique) {
            generatedOTP = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });

            notUnique = await OTP.findOne({ otp: generatedOTP });
        }

        //create OTP entry in DB
        const otpBody = await OTP.create({
            email,
            otp: generatedOTP
        });

        console.log(otpBody);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp: generatedOTP
        });

    }
    catch (error) {
        console.log("Error Occured while sending OTP.")
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Error Occured while sending OTP. Please try again."
        })
    }
}

//SignUp
exports.signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, otp } = req.body;

        //all the required fields validation
        if (!(firstName || lastName || email || password || confirmPassword || accountType || otp)) {
            return res.status(400).json({
                success: false,
                message: "All the required fields must be filled."
            })
        }

        //Passwords match validation
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match. Please try again."
            })
        }

        //check if User already exists
        const isUserPresent = await User.findOne({ email });

        if (isUserPresent) {
            return res.status(400).json({
                success: false,
                message: "This account is already registered. Try logging in instead."
            });
        }
        //                  Validation done

        //fetch most recent otp from DB
        const recentOTPs = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);

        //validate OTP
        if (recentOTPs.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP is not valid found."
            })
        } else if (recentOTPs[0].otp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP."
            })
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

        //create "Profile" to link with User model
        const profile = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });


        //create User entry in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            approved: approved,
            additionalDetails: profile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //return the response
        return res.status(200).json({
            success: true,
            user,
            message: "User registered successfully.",
        })


    }
    catch (error) {
        console.log("Error Occured While Signing Up");
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Failed to SignUp. Please try again."
        })
    }
}

//Login
exports.login = async (req, res) => {
    try {

        //get email and password from request body
        const { email, password } = req.body;

        //                      VALIDATION
        //check email and password are present
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Login Failed. All required fields must be filled."
            })
        }

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist. Please Signup."
            })
        }

        //              VALIDATION Done
        //compare passwords
        //password matches, create cookie and return response
        if (await bcrypt.compare(password, user.password)) {
            const jwtPayload = {
                id: user._id,
                email: user.email,
                accountType: user.accountType,
            }
            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            user.token = token;
            user.password = undefined;

            return res.status(200).cookie("token", token, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) }).json({
                success: true,
                token: token,
                user: user,
                message: "Logged in successfully.",
            })
        }

        //Password doesn't match
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid Password."
            })
        }

    }
    catch (error) {
        console.log("Error Occured While Logging In.");
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Login Failed. Please try again."
        });
    }
}

//changePassword
exports.changePassword = async (req, res) => {
    try {

        //retrieve current pass, new password and confirm password
        const { currentPassword, newPassword, confirmPassword } = req.body;

        //if any of these not present,return the response
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All the required fields must be filled."
            })
        }

        //newpassword and confirm password matches
        if (newPassword != confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "New Password and Confirm Password does not match."
            })
        }

        //verify the current password with DB
        let user = await User.findOne({ email: req.user.email });

        //if password matches, update password
        if (await bcrypt.compare(currentPassword, user.password)) {

            //hash newPassword
            const hashedPassword = await bcrypt(newPassword, 10);

            let user = await User.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true });



            //send PASSWORD changed Email


            //return success response
            return res.status(200).json({
                success: true,
                message: "Password Updated Successfully."
            })


        }
        //else return response
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid current password."
            })
        }

        //return response

    } catch (error) {
        console.log("Error Occured while changing password.")
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error Occured while changing password. Please try again."
        })
    }
}
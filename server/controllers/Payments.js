const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");

//capture payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    try {
        //get courseId and userId
        const { courseId } = req.body;
        const userId = req.user.id;
        //validation
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID not provided."
            })
        }
        //valid courseId
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID not provided."
            })
        }

        //valid courseDetail
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid course ID."
            })
        }

        //user already paid for the same course
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
            return res.status(400).json({
                success: false,
                message: "User already enrolled for this course."
            })
        }

        //create order
        const amount = course.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            notes: {
                courseId: course._id,
                userId,
            }
        };

        try {
            //initiate the payment using razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);

            //return response
            return res.status(200).json({
                success: true,
                message: "Order created successfully.",
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                curreny: paymentResponse.currency,
                amount: paymentResponse.amount,
            });
        } catch (error) {
            console.log(error);
            res.json({
                success: false,
                message: "Could not initiate order."
            })
        }


        //return response
    } catch (error) {
        console.log("Error occured at capturePayment Handler controller")
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })

    }
}


//verify signature handler
exports.verifySignature = async (req, res) => {

    const webhookSecret = "12345678";

    const signature = req.header["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is authorized.")

        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {
            //fulfill the action
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findByIdAndUpdate(
                courseId,
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found."
                });
            }

            console.log(enrolledCourse);

            //find the student and add the course to their list of enrolledCourses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                { $push: { courses: courseId } },
                { new: true }
            );

            console.log(enrolledStudent);

            if (!enrolledStudent) {
                return res.status(500).json({
                    success: false,
                    message: "User not found."
                });
            }

            //send confirmation mail
            const emailResponse = await mailSender(enrolledStudent.email, "Congratulations from StudyNotion", "Congratulations, you are onboarded into new StudyNotion Course.")

            console.log(emailResponse);

            return res.status(200).json({
                success: true,
                message: "Signature Verified and Course Added."
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }

    else {
        return res.status(500).json({
            success: false,
            message: "Invalid Request"
        })
    }


}
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");

//capture payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (!courses || !userId)
        return res.status({ success: false, message: "Course Id not received or User not found." })

    if (courses.length === 0)
        return res.status({ success: false, message: "Please provide the Courses Details" })

    let totalAmount = 0;

    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(200).json({ success: false, message: "Could not find the course" })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({ success: false, message: "Student is already enrolled" });
            }

            totalAmount += course.price;

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString()
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            data: paymentResponse,
            message: "Payment Capture Successful"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Could not Initiate Order" })
    }

}

// Verify Payment Handler
exports.verifyPayment = async (req, res) => {
    try {
        const razorpay_order_id = req?.body?.razorpay_order_id;
        const razorpay_payment_id = req?.body?.razorpay_payment_id;
        const razorpay_signature = req?.body?.razorpay_signature;
        const courses = req.body?.courses;
        const userId = req.user.id;

        // Parameters validation
        if (!razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature ||
            !razorpay_signature ||
            !courses ||
            !userId
        ) {
            return res.status(200).json({ success: false, message: "Payment Failed" });
        }

        let body = razorpay_order_id + "|" + razorpay_payment_id;
        const expected_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(body.toString())
            .digest("hex");

        // if signature doesn't matches
        if (expected_signature !== razorpay_signature)
            return res.status(200).json({ success: false, message: "Payment Failed" })

        // Signature Matches
        // Enroll the student
        await enrollStudents(courses, userId, res);

        return res.status(200).json({ success: true, message: "Payment Verified" })
    } catch (error) {
        console.log("Error Occured at verifyPayment handler")
        console.log(error);
        return res.status(500).json({ success: false, message: error.message })
    }
}

const enrollStudents = async (courses, userId, res) => {

    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: "Please Provide data for Courses or UserId" });
    }
    try {
        for (const courseId of courses) {
            // find the course and add the userId to the studentsEnrolled
            const enrolledCourse = await Course.findByIdAndUpdate(courseId,
                {
                    $push: { studentsEnrolled: userId }
                },
                { new: true }
            )

            if (!enrolledCourse)
                return res.status(500).json({ success: false, message: "Course not found" })

            // find the student and add the id of course/courses to courses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId,
                    }
                }, { new: true })

            if (!enrolledStudent)
                return res.status(500).json({ success: false, message: "Student not found" })

            // Send the Email to the student
            await mailSender(enrolledStudent.email,
                `Successfully enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            )
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    try {
        const { orderId, paymentId, amount } = req.body;
        const userId = req.user.id;

        if (!userId || !paymentId || !amount || !userId)
            return res.status(400).json({ success: false, message: "Please provide all the required fields" })

        const user = await User.findById(userId);

        const mailResponse = await mailSender(user.email, "Payment Received",
            paymentSuccessEmail(`${user.firstName} ${user.lastName}`, amount / 100, orderId, paymentId)
        )

    } catch (error) {
        console.log("Error occured at sendPaymentSuccessEmail handler");
        console.log(error);
        return res.status(500).json({ success: false, message: "Could not send email" })
    }
}


//capture payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//     try {
//         //get courseId and userId
//         const { courseId } = req.body;
//         const userId = req.user.id;
//         //validation
//         if (!userId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User ID not provided."
//             })
//         }
//         //valid courseId
//         if (!courseId) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Course ID not provided."
//             })
//         }

//         //valid courseDetail
//         const course = await Course.findById(courseId);
//         if (!course) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Please provide valid course ID."
//             })
//         }

//         //user already paid for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if (course.studentsEnrolled.includes(uid)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "User already enrolled for this course."
//             })
//         }

//         //create order
//         const amount = course.price;
//         const currency = "INR";

//         const options = {
//             amount: amount * 100,
//             currency,
//             receipt: Math.random(Date.now()).toString(),
//             notes: {
//                 courseId: course._id,
//                 userId,
//             }
//         };

//         try {
//             //initiate the payment using razorpay
//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             //return response
//             return res.status(200).json({
//                 success: true,
//                 message: "Order created successfully.",
//                 courseName: course.courseName,
//                 courseDescription: course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 curreny: paymentResponse.currency,
//                 amount: paymentResponse.amount,
//             });
//         } catch (error) {
//             console.log(error);
//             res.json({
//                 success: false,
//                 message: "Could not initiate order."
//             })
//         }


//         //return response
//     } catch (error) {
//         console.log("Error occured at capturePayment Handler controller")
//         console.error(error)
//         return res.status(500).json({
//             success: false,
//             message: error.message
//         })

//     }
// }


//verify signature handler
// exports.verifySignature = async (req, res) => {

//     const webhookSecret = "12345678";

//     const signature = req.header["x-razorpay-signature"];

//     const shasum = crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (signature === digest) {
//         console.log("Payment is authorized.")

//         const { courseId, userId } = req.body.payload.payment.entity.notes;

//         try {
//             //fulfill the action
//             //find the course and enroll the student in it
//             const enrolledCourse = await Course.findByIdAndUpdate(
//                 courseId,
//                 { $push: { studentsEnrolled: userId } },
//                 { new: true }
//             );

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "Course not found."
//                 });
//             }

//             console.log(enrolledCourse);

//             //find the student and add the course to their list of enrolledCourses
//             const enrolledStudent = await User.findByIdAndUpdate(
//                 userId,
//                 { $push: { courses: courseId } },
//                 { new: true }
//             );

//             console.log(enrolledStudent);

//             if (!enrolledStudent) {
//                 return res.status(500).json({
//                     success: false,
//                     message: "User not found."
//                 });
//             }

//             //send confirmation mail
//             const emailResponse = await mailSender(enrolledStudent.email, "Congratulations from StudyNotion", "Congratulations, you are onboarded into new StudyNotion Course.")

//             console.log(emailResponse);

//             return res.status(200).json({
//                 success: true,
//                 message: "Signature Verified and Course Added."
//             })

//         } catch (error) {
//             console.log(error);
//             return res.status(500).json({
//                 success: false,
//                 message: error.message
//             })
//         }
//     }

//     else {
//         return res.status(500).json({
//             success: false,
//             message: "Invalid Request"
//         })
//     }
// }
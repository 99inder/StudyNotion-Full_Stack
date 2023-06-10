const ratingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course")
const User = require("../models/User");
const RatingAndReview = require("../models/RatingAndReview");
const { default: mongoose } = require("mongoose");

//createRating
exports.createRating = async (req, res) => {
    try {
        //get userId
        const userId = req.user.id;
        //get data from body
        const { rating, review, courseId } = req.body;
        //validation
        if (!rating || !review) {
            return res.status(400).json({
                success: false,
                message: "All the required field must be filled."
            });
        }

        //check user is enrolled or not
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: { $elemMatch: { $eq: userId } }
            });

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Student is not enrolled in this course.`
            });
        }

        //check if user already reviewed
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: `Course is already reviewed by this user.`
            });
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
            user: userId,
            rating,
            review,
        });

        //update course with the rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: { ratingAndReviews: ratingReview._id }
            },
            { new: true }
        );

        console.log(updatedCourseDetails);

        //return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully."
        })
    } catch (error) {

    }
}

//getAverageRating
exports.getAverageRating = async (req, res) => {
    try {
        //get courseId
        const { courseId } = req.body;

        //calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: "$rating" },
                }
            }
        ]);

        //return rating
        if (rating.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        //if no rating/review exist
        return res.status(400).json({
            success: true,
            message: "Average Rating: 0 (No Rating/Review found).",
            averageRating: 0,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};

//getAllRating
exports.getAllRatings = async (req, res) => {
    try {

        const allReviews = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All ratings and reviews fetched successfully.",
            data: allReviews
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    };
};
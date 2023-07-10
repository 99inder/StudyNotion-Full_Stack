//imports
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/imageUploader");

//createCourse handler
exports.createCourse = async (req, res) => {
    try {
        //get data
        const userId = req.user.id;
        const { courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions } = req.body;

        //get Thumbnail
        const thumbnail = req?.files?.thumbnailImage;

        //validation
        if (!courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !thumbnail ||
            !tag
        ) {
            return res.status(400).json({
                success: false,
                message: "All the required fields must be filled."
            })
        }

        if (!status || status === undefined) {
            status = "Draft";
        }

        //check and get Instructor details to put his/her ID in Course model
        const instructorDetails = await User.findById(userId, { accountType: "instructor" });
        //TODO: Verify that userId and instructorDetails._id are same or different ?

        //if instructor not found, return response
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found."
            })
        }

        //category validation
        const categoryDetails = await Category.findById(category);

        //if category not found, return response
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Invalid Category."
            })
        }

        //upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        //create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            tag,
            status,
            instructions
        });

        //update User (Instructor in this case, so we add this course to it's 'Courses' field)
        await User.findByIdAndUpdate(
            instructorDetails._id,
            {
                $push: {
                    courses: newCourse._id,
                }
            },
            { new: true }
        );

        //TODO: update Category Schema (DONE)
        await Category.findByIdAndUpdate(
            category,
            { $push: { courses: newCourse._id } }
        )

        //return response
        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        });


    } catch (error) {
        console.log("Error Occured while creating course");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to create course. Please try again.",
            error: error.message,
        });
    }
}

//getAllCourses handler
exports.getAllCourses = async (req, res) => {
    try {

        //fetch all courses from DB
        const allCourses = await Category.find({}); //TODO: change this statement incrementally

        //return response
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetched successfully.",
            data: allCourses,
        })

    } catch (error) {
        console.log("Error Occured while fetching all courses");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch all courses. Please try again.",
        });
    }
}

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try {

        //get courseId
        const { courseId } = req.body;

        //validate
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Invalid Course Id"
            })
        }

        //find course and validate
        const courseDetails = await Course.findById(courseId)
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetails"
                    }
                }
            )
            .populate("category")
            .populate("ratingAndReviews")
            .populate(
                {
                    path: "courseContent",
                    populate: {
                        path: "subSection"
                    }
                }
            )
            .exec();

        //validation
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with course id: ${courseId}`
            })
        }

        //return populated response
        return res.status(200).json({
            success: true,
            message: "Course Details fetched successfully.",
            data: courseDetails
        })

    } catch (error) {
        console.log("Error Occured while fetching course details");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Unable to fetch course details. Please try again.",
            error: error.message
        });
    }
}
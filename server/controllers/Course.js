//imports
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
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
            tag: JSON.parse(tag),
            status,
            instructions: JSON.parse(instructions)
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

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        // If Thumbnail Image is found, update it
        if (req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key])
                } else {
                    course[key] = updates[key]
                }
            }
        }

        await course.save()

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}

// get Instructor Courses
exports.getInstructorCourses = async (req, res) => {
    try {
        // Get the instructor ID from the authenticated user or request body
        const instructorId = req.user.id

        // Find all courses belonging to the instructor
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })

        if (!instructorCourses) {
            return res.status(404).json({
                success: false,
                message: "No course found corresponding to this user."
            })
        }

        // Return the instructor's courses
        return res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}

//get entire data of the course with everything populated
exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        // if (courseDetails.status === "Draft") {
        //   return res.status(403).json({
        //     success: false,
        //     message: `Accessing a draft course is forbidden`,
        //   });
        // }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        return res.status(200).json({
            success: true,
            data: courseDetails,
        })
    } catch (error) {
        console.log("Error Occured at getFullCourseDetails API>>>\n", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// Delete the Course
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const userId = req.user.id;

        // Find the course
        const course = await Course.findById({ _id: courseId, instructor: userId });

        if (!course) {
            return res.status(404).json({ success: false, message: "Course not found" })
        }

        // Unenroll students from the course
        const studentsEnrolled = course?.studentsEnrolled

        if (studentsEnrolled)
            for (const studentId of studentsEnrolled) {
                await User.findByIdAndUpdate(studentId, {
                    $pull: { courses: courseId },
                })
            }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        // Remove the course from the Category
        await Category.findByIdAndUpdate(course.category, {
            $pull : {courses : courseId}
        });

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        })
    }
}
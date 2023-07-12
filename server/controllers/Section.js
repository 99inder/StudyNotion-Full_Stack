const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

//createSection handler
exports.createSection = async (req, res) => {
    try {
        //fetch Data from body
        const { sectionName, courseId } = req.body;

        //data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "All required field must be filled."
            })
        }

        //validate if Course exists
        const courseExist = await Course.findById(courseId);

        if (!courseExist) {
            return res.status(400).json({
                success: false,
                message: "Invalid Course."
            })
        }

        //create Section
        const newSection = await Section.create({ sectionName });

        //update Course with Section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: { courseContent: newSection._id }
            },
            { new: true }
        ).populate(
            {
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            }
        ).exec();

        // HW: [DONE ABOVE] use populate to replace section & sub-section both in the updatedCourseDetails

        //return response
        return res.status(200).json({
            success: true,
            message: "Section Created Successfully.",
            data: updatedCourseDetails
        })
    } catch (error) {
        console.log("Error occured while creating new Section.")
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Section. Please try again.",
            error: error.message
        })
    }
}

//updateSection Handler
exports.updateSection = async (req, res) => {
    try {
        //fetch Data from body
        const { sectionName, sectionId } = req.body;

        //data validation
        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "All required field must be filled.",
            })
        }

        //update section data
        const updatedSectionDetails = await Section.findByIdAndUpdate(sectionId, { sectionName: sectionName }, { new: true }).populate("subSection");

        //send response
        return res.status(200).json({
            success: true,
            message: "Section data updated successfully",
            data: updatedSectionDetails
        })

    } catch (error) {
        console.log("Error occured while updating Section.")
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update Section. Please try again.",
            error: error.message
        })
    }
}

//deleteSection handler
exports.deleteSection = async (req, res) => {
    try {

        const { sectionId, courseId } = req.body;
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not Found",
            })
        }

        //delete sub section
        await SubSection.deleteMany({ _id: { $in: section.subSection } });

        await Section.findByIdAndDelete(sectionId);

        //find the updated course and return 
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
            .exec();

        res.status(200).json({
            success: true,
            message: "Section deleted",
        });
    } catch (error) {
        console.log("Error occured while deleting Section.")
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete Section. Please try again.",
            error: error.message
        })
    }
}
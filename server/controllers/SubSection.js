const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const uploadImageToCloudinary = require("../utils/imageUploader");

//createSubSection handler
exports.createSubSection = async (req, res) => {
    try {
        //fetch data from req.body
        const { sectionId, title, description } = req.body;
        //extract file/video
        const video = req.files.video;
        //validation
        if (!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be filled."
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        //create SubSection
        const subSectionDetails = await SubSection.create({
            title,
            description,
            timeDuration: `${uploadDetails.duration}`,
            videoUrl: uploadDetails.secure_url
        });

        //update section with this subsection Objectid
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {
                $push: {
                    subSection: subSectionDetails._id
                }
            },
            { new: true }).populate("subSection");

        //HW: get updatedSection here, after adding populate query
        //DONE is return res below (testing Pending)


        //return response
        return res.status(200).json({
            success: true,
            message: "Sub-Section create successfully",
            updatedSection
        })

    } catch (error) {
        console.log("Error occured while creating Sub-Section.")
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create Sub-Section. Please try again.",
            error: error.message
        })
    }
}

//updateSubSection
exports.updateSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId, title, description } = req.body
        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save()

        const updatedSection = await Section.findById(sectionId).populate("subSection");

        return res.json({
            success: true,
            data: updatedSection,
            message: "Section updated successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the section",
        })
    }
}


//deleteSubSection
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body

        const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        return res.json({
            success: true,
            message: "SubSection deleted successfully",
        })
    } catch (error) {
        console.log("Error occured while deleting Sub-Section.")
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete Sub-Section. Please try again.",
            error: error.message
        })
    }
}
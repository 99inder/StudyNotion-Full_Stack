const SubSection = require("../models/SubSection")
const Section = require("../models/Section");
const uploadImageToCloudinary = require("../utils/imageUploader");

//createSubSection handler
exports.createSubSection = async (req, res) => {
    try {
        //fetch data from req.body
        const { sectionId, title, timeDuration, description } = req.body;
        //extract file/video
        const video = req.files.video;
        //validation
        if (!sectionId || !title || !timeDuration || !description || !video) {
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
            timeDuration,
            description,
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
        //fetch data
    } catch (error) {
        console.log("Error occured while updating Sub-Section.")
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update Sub-Section. Please try again.",
            error: error.message
        })
    }
}


//deleteSubSection
exports.deleteSubSection = async (req, res) => {
    try {
        //fetch data
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
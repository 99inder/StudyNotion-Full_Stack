const Profile = require("../models/Profile");
const User = require("../models/User");
const uploadImageToCloudinary = require("../utils/imageUploader");

//updateProfile handler
exports.updateProfile = async (req, res) => {
  try {
    //get data
    const { dateOfBirth = "", about = "", contactNumber, gender = "" } = req.body;
    //get userId
    const userId = req.user.id;

    //find Profile._id (additionalDetails._id)
    const { additionalDetails } = await User.findById(userId);

    //get User Profile aditionalDetails
    const profile = await Profile.findById(additionalDetails);

    //update User Profile
    profile.gender = gender;
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    //update/save to DB
    await profile.save();

    //return response
    return res.status(200).json({
      success: true,
      message: "Profle updated successfully.",
      profile,
    })

  } catch (error) {
    console.log("Error occured in update profile controller.")
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile. Please try again."
    })
  }
}

//deleteAccount handler
exports.deleteAccount = async (req, res) => {
  try {
    //get id
    const userId = req.user.id;

    //validate
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found."
      })
    }
    //delete Profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    //TODO: HW: remove user from all enrolled courses

    //delete User
    await User.findByIdAndDelete({ _id: userId });

    //return response
    return res.status(200).json({
      success: true,
      message: "User deleted successfully."
    })
  } catch (error) {
    console.log("Error occured in deleteAccount controller handler.")
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete account. Please try again.",
      error: error.message
    })
  }
}

//getAllUserDetails
exports.getAllUserDetails = async (req, res) => {
  console.log("triggered")
  try {
    //get userId
    const userId = req.user.id;

    //validate
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID not found."
      })
    };

    //find corresponding user id DB
    const userDetails = await User.findById(userId).populate("additionalDetails").exec();

    //validate
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User not found."
      })
    }

    //setting the password to undefined
    userDetails.password = undefined;

    //return response
    return res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      userDetails,
    });

  } catch (error) {
    console.log("Error occured in getUserDetails controller handler.")
    console.error(error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to get user details. Please try again.",
      error: error.message
    })
  }
}

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate("courses")
      .exec()
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Enrolled Courses Fetched Successfully.',
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};
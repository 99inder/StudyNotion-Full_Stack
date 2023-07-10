import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const { COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    UPDATE_SECTION_API,
    CREATE_SECTION_API,
} = courseEndpoints;

export const fetchCourseCategories = async () => {

    let result = [];

    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API);

        if (!response.data.success)
            throw new Error(response.data.message);

        result = response.data.allCategories;
    } catch (error) {
        console.log("Error occured at fetchCoureCategory in courseDetailsAPI....");
        console.log(error.message);
    }
    return result;
}

// add the course details
export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// edit the course details
export const editCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", EDIT_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("EDIT COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// update a section
export const updateSection = async (data, token) => {
    let result = [];
    const toastId = toast.loading("Updating...");

    try {
        const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        if (!response?.data?.success) {
            throw new Error("Section Update Api Error");
        }
        result = response?.data?.data;
        toast.success("Section Updated")
    } catch (error) {
        console.log("Error Occured at course updateSection API....", error);
        toast.error("Failed to update section")
    }
    toast.dismiss(toastId);
    return result;
}

// create section
export const createSection = async (data, token) => {
    let result;
    const toastId = toast.loading("Creating Section...");

    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        if (!response?.data?.success) {
            throw new Error("createSection Api Error");
        }
        result = response?.data?.data;
        toast.success("Section Created")
    } catch (error) {
        console.log("Error Occured at course createSection API....", error);
        toast.error("Failed to create section");
    }

    console.log("createSection API RESPONSE...", result);

    toast.dismiss(toastId);
    return result;
}
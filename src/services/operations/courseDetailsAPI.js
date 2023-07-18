import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { courseEndpoints } from "../apis";

const { COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    UPDATE_SECTION_API,
    CREATE_SECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    COURSE_DETAILS_API,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API
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
        console.log(result);
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
        console.log("course updateSection API response", result);
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

//delete Section [TODO: HAVE TO TAKE A LOOK AT IT's BACKEND]
export const deleteSection = async (data, token) => {
    let result;
    const toastId = toast.loading("Deleting Section...");

    try {
        const response = await apiConnector("POST", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        if (!response?.data?.success)
            throw new Error("deleteSection API Error");

        result = response?.data;
        toast.success("Section Deleted");

    } catch (error) {
        console.log("Error Occured at course deleteSection API...", error);
        toast.error("Failed to delete section");
    }

    console.log("deleteSection API RESPONSE...", result);

    toast.dismiss(toastId);
    return result;
}

//delete Sub-Section
export const deleteSubSection = async (data, token) => {
    let result;
    const toastId = toast.loading("Deleting Sub-Section...");

    try {
        const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        });

        if (!response.data.success)
            throw new Error("deleteSubSection API Error");

        result = response?.data;
        toast.success("Sub-Section Deleted");

    } catch (error) {
        console.log("Error Occured at course deleteSubSection API...", error);
        toast.error("Failed to delete Sub-Section");
    }

    console.log("deleteSubSection API RESPONSE...", result);

    toast.dismiss(toastId);
    return result;
}

// create Sub-Section
export const createSubSection = async (data, token) => {
    let result;
    const toastId = toast.loading("Creating Sub-Section...");

    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        });

        if (!response.data.success)
            throw new Error("createSubSection API Error");

        result = response?.data;
        toast.success("Sub-Section Created");

    } catch (error) {
        console.log("Error Occured at course createSubSection API...", error);
        toast.error("Failed to create Sub-Section");
    }

    console.log("createSubSection API RESPONSE...", result);

    toast.dismiss(toastId);
    return result;
}

// update Sub-Section
export const updateSubSection = async (data, token) => {
    let result;
    const toastId = toast.loading("Updating Sub-Section...");

    try {
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
        });

        if (!response.data.success)
            throw new Error("updateSubSection API Error");

        result = response?.data;
        toast.success("Sub-Section Updated");

    } catch (error) {
        console.log("Error Occured at course updateSubSection API...", error);
        toast.error("Failed to update Sub-Section");
    }

    console.log("updateSubSection API RESPONSE...", result);

    toast.dismiss(toastId);
    return result;
}

// Fetching the instructor courses
export const fetchInstructorCourses = async (token) => {
    const toastId = toast.loading("Fetching Courses...");
    let result;

    try {
        result = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorization: `Bearer ${token}`
        })

        result = result?.data;

        if (!result?.success)
            throw new Error(result?.message);

        toast.success("Courses Fetched Successfully");
    } catch (error) {
        console.log("Error Occured at course getInstructorCourses API...", error);
        toast.error("Failed to update Sub-Section");
    }

    toast.dismiss(toastId);
    return result;
}

//Delete a course
export const deleteCourse = async (data, token) => {
    const toastId = toast.loading("Deleting the course...");
    let result;

    try {
        const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
            Authorization: `Bearer ${token}`
        })

        if (!response?.data?.success)
            throw new Error(response.data.message);

        result = response?.data;
        toast.success("Course Deleted Successfully");

    } catch (error) {
        console.log("Error occured at course deleteCourse API>>>", error);
        toast.error("Course Deletion Failed.");
    }

    toast.dismiss(toastId);
    return result?.data?.success;
}

// get full details of a course
export const getFullDetailsOfCourse = async (courseId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, {
            courseId,
        })
        console.log("COURSE_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}

// mark a lecture as complete
export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log(
            "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
            response
        )

        if (!response.data.message) {
            throw new Error(response.data.error)
        }
        toast.success("Lecture Completed")
        result = true
    } catch (error) {
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}

// create a rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE RATING API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Rating")
        }
        toast.success("Rating Created")
        success = true
    } catch (error) {
        success = false
        console.log("CREATE RATING API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
}
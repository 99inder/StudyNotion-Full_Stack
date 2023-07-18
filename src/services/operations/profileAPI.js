import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";

const { GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DASHBOARD_DATA_API } = profileEndpoints;

export const getUserEnrolledCourses = async (token) => {

    const toastId = toast.loading("Loading...");
    let result = [];

    try {
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response.data.data;

    } catch (error) {
        console.log("Error occured at getUseEnrolledCourses...", error);
        toast.error("Failed to Fetch Enrolled Courses.")
    }

    toast.dismiss(toastId);
    return result;
}

// Get instructor dashboard data
export const getInstructorDashboardData = async (token) => {
    const toastId = toast.loading("Retrieving Data...");
    let result = [];

    try {
        const response = await apiConnector("GET", GET_INSTRUCTOR_DASHBOARD_DATA_API, null, {
            Authorization: `Bearer ${token}`
        });

        console.log("GET_INSTRUCTOR_DASHBOARD_DATA_API response>>>>", response);
        result = response?.data?.courses;

    } catch (error) {
        console.log("Error occured at Profile API, getInstructorDashboardData\n", error);
        toast.error("Could not get dashboard data")
    }

    toast.dismiss(toastId);
    return result;
}
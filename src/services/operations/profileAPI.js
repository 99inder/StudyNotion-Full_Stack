import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { profileEndpoints } from "../apis";

const { GET_USER_ENROLLED_COURSES_API } = profileEndpoints;

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
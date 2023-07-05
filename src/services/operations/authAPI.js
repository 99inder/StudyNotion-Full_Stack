import { toast } from "react-hot-toast";
import { setLoading, setToken } from "../../redux/slices/authSlice"
import { apiConnector } from '../apiconnector';
import { authEndpoints } from "../apis";
import { setUser } from "../../redux/slices/profileSlice";
import { resetCart } from "../../redux/slices/cartSlice";

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSWORD_API,
    RESETPASSTOKEN_API,
} = authEndpoints


//Send OTP fro Email Verification
export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });

            console.log("SENDOTP API RESPONSE>>>", response);

            if (!response.data.success) {
                console.log("Error at send otp...", response);
                throw new Error(response.data.message);
            }

            toast.success("OTP sent successfully. Please check your email.");
            navigate('/verify-email');

        } catch (error) {
            console.log(error);
            toast.error("Failed to send OTP");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
};

export const signUp = (accountType, firstName, lastName, email, password, confirmPassword, otp, navigate) => {
    return async (dispatch) => {

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp,
            });

            console.log("SIGNUP API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Signup Successful");
            navigate('/login');

        } catch (error) {
            console.log("ERROR AT SIGNUP>>>", error);
            toast.error("Signup Failed");
            navigate('/signup');
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const login = (email, password, navigate) => {
    return async (dispatch) => {

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));

        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password });

            console.log("LOGIN API RESPONSE>>>", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Login Successful");

            //setting authentication token in redux
            dispatch(setToken(response.data.token));
            //setting user in redux
            dispatch(setUser(response.data.user));
            //setting authentication token in localStorage
            localStorage.setItem('token', JSON.stringify(response.data.token));
            //setting user in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/dashboard/my-profile');

        } catch (error) {
            console.log("ERROR AT LOGIN>>>", error);
            toast.error("Login Failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const logout = (navigate) => {
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        dispatch(resetCart());
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        toast.success("Logged Out");
        navigate('/');
    }
}

export const getPasswordResetToken = (email, setIsEmailSent) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, { email });
            console.log("Reset Password Response....", response);

            if (!response.data.success) {
                console.log(response.data.message);
                throw new Error(response.data.message);
            }

            toast.success("Password Reset Email Sent");
            setIsEmailSent(true);
        }
        catch (error) {
            console.log("Reset Password Token Error");
            toast.error(error.response.data.message);
            console.log(error);
        }
        dispatch(setLoading(false));
    }
}

export const resetPassword = (password, confirmPassword, token) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {

            const response = await apiConnector('POST', RESETPASSWORD_API, { token, password, confirmPassword });
            console.log("Reset Password Reponse...\n", response);
            toast.success("Password Update Successful.");

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        dispatch(setLoading(false));
    }
}
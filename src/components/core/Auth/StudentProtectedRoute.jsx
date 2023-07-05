import { useSelector } from "react-redux"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
    const { user } = useSelector(state => state.profile);

    if (user?.accountType !== ACCOUNT_TYPE.STUDENT) {
        toast.error("This is protected route for Students only.")
        return <Navigate to={"/dashboard/my-profile"} />
    }

    else {
        return children;
    }
}

export default StudentProtectedRoute
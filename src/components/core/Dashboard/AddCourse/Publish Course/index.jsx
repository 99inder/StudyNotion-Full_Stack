import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../common/IconBtn"
import { useState } from "react";
import { resetCourseState, setStep } from "../../../../../redux/slices/courseSlice"
import { useEffect } from "react";
import { COURSE_STATUS } from "../../../../../utils/constants"
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { toast } from "react-hot-toast";
import { IoIosArrowBack } from "react-icons/io"

const PublishCourse = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState();
    const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm();
    const { course } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED)
            setValue("public", true);
    }, [])

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const isFormUpdated = () => {
        if ((course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            return false;
        }
        return true;
    }

    const onSubmit = async () => {
        //No Updation in Form
        //No need to make API call
        if (!isFormUpdated()) {
            toast.error("No changes were made")
            goToCourses();
        }

        // Form is Updated
        //Preparing form data for payload
        const formData = new FormData();
        formData.append("courseId", course._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);
        // Making API call
        setLoading(true);
        const result = await editCourseDetails(formData, token);

        if (result?.success)
            goToCourses();

        setLoading(false);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="bg-richblack-800 rounded-lg px-2 py-6 lg:p-6">
                <h3 className="text-richblack-5 text-2xl font-semibold mb-[1.625rem]">Publish Course</h3>
                <div>
                    <label htmlFor="public">
                        <input
                            type="checkbox"
                            id="public"
                            {...register("public")}
                            className="w-5 bg-richblack-500"
                        />
                        <span className="text-richblack-400 font-semibold ml-2">Make this Course Public</span>
                    </label>
                </div>
            </div>

            <div className="flex justify-between gap-x-3 lg:mt-[5.3125rem]">
                <button
                    type="button"
                    disabled={loading}
                    onClick={() => dispatch(setStep(2))}
                    className="bg-richblack-600 text-richblack-5 px-5 rounded-md font-medium"
                >
                    <span className="flex items-center text-richblack-5 font-medium gap-x-2">
                        <IoIosArrowBack />
                        <p>Back</p>
                    </span>
                </button>
                <IconBtn
                    disabled={loading}
                    type="submit"
                    text="Save and Publish"
                    customClasses={"font-semibold"}
                />
            </div>
        </form>
    )
}

export default PublishCourse
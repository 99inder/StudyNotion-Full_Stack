import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { setEditCourse, setCourse } from "../../../../redux/slices/courseSlice"
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import Spinner from "../../../common/Spinner";
import RenderSteps from "../AddCourse/RenderSteps";

const EditCourse = () => {

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await getFullDetailsOfCourse(courseId, token);
            if (result) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.data))
            }
            setLoading(false);
        }

        populateCourseDetails();

        return () => {
            dispatch(setEditCourse(false));
            dispatch(setCourse(null));
        }

    }, [])


    if (loading)
        return (
            <Spinner />
        )

    return (
        <div className="w-11/12 max-w-maxContent mx-auto">
            <h1 className="text-richblack-5 text-2xl leading-6 my-10 font-semibold">Edit Course</h1>
            <div className="lg:w-[80%] mx-auto">
                {
                    course ? (<RenderSteps />) : <p>Course Not Found</p>
                }
            </div>
        </div>
    )
}

export default EditCourse
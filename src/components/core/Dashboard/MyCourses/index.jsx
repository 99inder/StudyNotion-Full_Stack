import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import IconBtn from "../../../common/IconBtn"
import { MdAddCircleOutline } from "react-icons/md"
import CoursesTable from "../InstructorCourses/CoursesTable";
import { useState } from "react";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";

const MyCourses = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = useState(null);
  const { token } = useSelector(state => state.auth);

  const fetchCourses = async () => {
    const result = await fetchInstructorCourses(token);

    if (!result?.success)
      return;

    setCourses(result.data);
  }

  useEffect(() => {
    fetchCourses();
  }, [])


  return (
    <div className="w-11/12 max-w-maxContent mx-auto mt-[3.6875rem]">
      <div className="flex justify-between items-center mb-9">
        <h3 className="text-richblack-5 text-3xl font-medium leading-[126.667%]">My Courses</h3>
        <IconBtn
          type="button"
          text="New"
          innerClasses={"gap-x-2 text-richblack-900 text-medium font-medium leading-[1.5rem]"}
          onclick={() => navigate("/dashboard/add-course")}
        >
          <MdAddCircleOutline />
        </IconBtn>
      </div>

      {
        courses && <CoursesTable courses={courses} setCourses={setCourses} />
      }
    </div>
  )
}

export default MyCourses
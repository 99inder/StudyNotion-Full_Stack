import { useDispatch } from "react-redux"
import {setStep} from "../../../../../redux/slices/courseSlice"

const CourseBuilderForm = () => {

  const dispatch = useDispatch();

  return (
    <div className="px-2 py-4 lg:p-6 bg-richblack-800 rounded-lg border-[1px] border-richblack-700 flex flex-col gap-[26px]">
      <h3 className="text-richblack-5 text-2xl font-semibold">Course Builder</h3>
      <button onClick={() => dispatch(setStep(1))}>Back</button>
    </div>
  )
}

export default CourseBuilderForm
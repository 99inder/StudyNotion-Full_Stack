import { useDispatch, useSelector } from "react-redux"
import { setCourse, setEditCourse, setStep } from "../../../../../redux/slices/courseSlice"
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { useState } from "react";
import { BsPlusCircle } from "react-icons/bs"
import { BiChevronRight } from "react-icons/bi"
import NestedView from "./NestedView";
import { toast } from "react-hot-toast";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { course } = useSelector(state => state.course);
  const { token } = useSelector(state => state.auth);
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (data) => {

    setLoading(true);
    let result;

    //Editing Section
    if (editSectionName) {
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
      }, token);

      const updatedCourseContent = course.courseContent.map(section => section._id === result._id ? result : section);
      const updatedCourse = { ...course, courseContent: updatedCourseContent };

      result = updatedCourse;
    }

    //Creating Section
    else {
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id,
      }, token)
    }

    // update values
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }

    //loading false
    setLoading(false);

  }

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  }

  function goBack() {
    dispatch(setEditCourse(true));
    dispatch(setStep(1));
  }

  function goNext() {
    // VALIDATIONS
    if (course.courseContent.length === 0) {
      toast.error("Please create atleast 1 section.");
      return;
    }
    if (course.courseContent.some(section => section.subSection.length === 0)) {
      toast.error("Please add atleast 1 sub-section in each section.");
      return;
    }
    // All good and validated
    dispatch(setStep(3));
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {

    if (editSectionName) {
      cancelEdit();
      return;
    }

    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  }

  return (
    <div className="px-2 py-4 lg:p-6 bg-richblack-800 rounded-lg border-[1px] border-richblack-700 flex flex-col gap-4 lg:gap-[26px]">
      <h3 className="text-richblack-5 text-2xl font-semibold">Course Builder</h3>

      {
        course?.courseContent?.length > 0 && (
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} cancelEdit={cancelEdit} />
        )
      }

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Course sectionName Input */}
        <div>
          <label htmlFor="sectionName"
            className="text-richblack-5 text-sm leading-[1.375rem]">Section Name <sup className="text-pink-200">*</sup></label>
          <input
            id="sectionName"
            type="text"
            placeholder="Add a section to build your course"
            {...register("sectionName", { required: true })}
            className="w-full p-3 mt-[6px] bg-richblack-700 text-richblack-5 rounded-lg font-medium"
          />
          {
            errors.sectionName && <span className="ml-2 text-xs tracking-wide text-pink-200">Section name is required</span>
          }
        </div>

        {/* Create / Edit Section Buttons */}
        <div className="flex gap-x-7 flex-wrap mt-[1.625rem]">
          <IconBtn
            type={"submit"}
            disabled = {loading ? true : false}
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            customClasses={"!bg-transparent border-yellow-50 border-[1px] !text-yellow-50 "}
            innerClasses={"gap-3"}
          >
            {
              !editSectionName && <BsPlusCircle className="font-semibold text-xl" />
            }
          </IconBtn>
          {editSectionName &&
            <button button type="button" onClick={cancelEdit} className="text-sm text-richblack-300 underline">Cancel Edit</button>
          }
        </div>

        <div className="flex gap-x-5 justify-end mt-10">
          <button
            type="button"
            onClick={goBack}
            className="bg-richblack-600 text-richblack-5 px-5 rounded-md font-medium"
          >
            Back
          </button>
          <IconBtn
            text={"Next"}
            customClasses={"font-medium flex-row-reverse"}
            innerClasses={"flex-row-reverse gap-1 my-auto"}
            onclick={goNext}
          >
            <BiChevronRight className="text-xl" />
          </IconBtn>
        </div>
      </form >
    </div >
  )
}

export default CourseBuilderForm
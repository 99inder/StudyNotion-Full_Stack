import { useEffect, useState } from "react";
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { BiChevronRight } from "react-icons/bi"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import RequirementsField from "./RequirementsField";
import { setStep, setCourse } from "../../../../../redux/slices/courseSlice";
import { addCourseDetails, editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";
import { toast } from "react-hot-toast";
import { COURSE_STATUS } from "../../../../../utils/constants";
import IconBtn from "../../../../common/IconBtn";

const CourseInformationForm = () => {

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm();

  const dispatch = useDispatch();

  const { token } = useSelector(state => state.auth)
  const { course, editCourse } = useSelector(state => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);

      const categories = await fetchCourseCategories();
      console.log(categories);
      setCourseCategories(categories);

      setLoading(false);
    }

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseTags", course.tag);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseCategory", course.category);
      setValue("courseRequirements", course.instructions);
      setValue("courseImage", course.thumbnail);
    }

    getCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseImage !== course.thumbnail ||
      currentValues.courseRequirements.toString() !== course.instructions.toString())
      return true;
    else
      return false;
  }

  //handles next button click
  const onSubmit = async (data) => {

    let result;
    const formData = new FormData();

    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
          formData.append("instructions", JSON.stringify(data.courseRequirements))
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }

        setLoading(true);
        result = await editCourseDetails(formData, token);
        setLoading(false);
        if (result) {
          dispatch(setStep(2));
          dispatch(setCourse(result));
        }
      }
      else {
        toast.error("No Changes made so far");
      }

      return;
    }

    //create a new course
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("category", data.courseCategory);
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("thumbnailImage", data.courseImage);

    setLoading(true);
    console.log("BEFORE add course API call");
    console.log("PRINTING FORMDATA", formData);
    result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
    console.log("PRINTING FORMDATA", formData);
    console.log("PRINTING result", result);

  }

  return (
    <form
      onSubmit={(handleSubmit(onSubmit))}
      className="px-2 py-4 lg:p-6 bg-richblack-800 rounded-lg border-[1px] border-richblack-700 flex flex-col gap-[24px]"
    >

      {/* COURSE TITLE */}
      <div>
        <label htmlFor="courseTitle"
          className="text-richblack-5 text-sm leading-[1.375rem]">Course Title <sup className="text-pink-200">*</sup></label>
        <input
          id="courseTitle"
          type="text"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full p-3 mt-[6px] bg-richblack-700 text-richblack-5 rounded-lg font-medium"
        />
        {
          errors.courseTitle && <span className="ml-2 text-xs tracking-wide text-pink-200">Course title is required</span>
        }
      </div>

      {/* COURSE DESCRIPTION */}
      <div>
        <label htmlFor="courseShortDesc"
          className="text-richblack-5 text-sm leading-[1.375rem]">Course Short Description <sup className="text-pink-200">*</sup></label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Description"
          rows={5}
          {...register("courseShortDesc", { required: true })}
          className="w-full p-3 mt-[6px] bg-richblack-700 text-richblack-5 rounded-lg font-medium"
        />
        {
          errors.courseShortDesc && <span className="ml-2 text-xs tracking-wide text-pink-200">Course Description is required</span>
        }
      </div>

      {/* COURSE PRICE */}
      <div className="relative">
        <label htmlFor="coursePrice"
          className="text-richblack-5 text-sm leading-[1.375rem]">Price <sup className="text-pink-200">*</sup></label>
        <input
          id="coursePrice"
          type="number"
          placeholder="Enter Price"
          {...register("coursePrice", {
            required: { value: true, message: "Course Description is required" },
            valueAsNumber: true,
            min: { value: 1, message: "Course Price can't be negative." },
          })}
          className="w-full p-3 pl-[50px] mt-[6px] bg-richblack-700 text-richblack-5 rounded-lg font-medium"
        />
        <HiOutlineCurrencyRupee className="absolute text-richblack-500 text-[1.375rem] bottom-[18%] left-[12px]" />
        {
          errors.coursePrice && <span className="ml-2 text-xs tracking-wide text-pink-200">{errors.coursePrice.message}</span>
        }
      </div>

      {/* COURSE CATEGORY */}
      <div>
        <label htmlFor="courseCategory"
          className="text-richblack-5 text-sm leading-[1.375rem]">Category <sup className="text-pink-200">*</sup></label>
        <select
          id="courseCategory"
          defaultValue=""
          {...register("courseCategory", { required: true })}
          className="w-full p-3 mt-[6px] bg-richblack-700 rounded-lg font-medium text-richblack-5"
        >
          <option value="" disabled>Choose a Category</option>
          {
            !loading && courseCategories.map((category, idx) => (
              <option key={idx} value={category?._id}>{category?.name}</option>
            ))
          }
        </select>
        {
          errors.category && <span className="ml-2 text-xs tracking-wide text-pink-200">{"Course Category is required"}</span>
        }
      </div>

      {/* COURSE TAGS COMPONENTS */}
      <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Type tag name and press Enter"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      {/* COURSE IMAGE COMPONENT */}
      {/* create a component for uploading and showing preview of media */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* BENEFITS OF THE COURSE */}
      <div>
        <label htmlFor="courseBenefits"
          className="text-richblack-5 text-sm leading-[1.375rem]">Benefits of the course <sup className="text-pink-200">*</sup></label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Benefits of the course"
          rows={5}
          {...register("courseBenefits", { required: true })}
          className="w-full p-3 mt-[6px] bg-richblack-700 text-richblack-5 rounded-lg font-medium"
        />
        {
          errors.courseShortDesc && <span className="ml-2 text-xs tracking-wide text-pink-200">Course Benefits are required</span>
        }
      </div>

      {/* REQUIREMENT / INSTRUCTIONS FIELD */}
      <RequirementsField
        name="courseRequirements"
        label="Requirements/Instructions"
        placeholder="Enter Requirements/Instructions"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      <div className="flex justify-end gap-5 flex-wrap">
        {
          editCourse &&
          <button
            onClick={() => dispatch(setStep(2))}
            className="bg-richblack-700 px-3 rounded-md text-richblack-5 font-medium"
          >
            Continue Without Saving
          </button>
        }

        <IconBtn
          type={"submit"}
          text={editCourse ? "Save Changes" : "Next"}
          customClasses={"font-medium flex-row-reverse"}
          innerClasses={"flex-row-reverse gap-1 my-auto"}
        >
          <BiChevronRight className="text-xl" />
        </IconBtn>
      </div>

    </form>
  )
}


export default CourseInformationForm
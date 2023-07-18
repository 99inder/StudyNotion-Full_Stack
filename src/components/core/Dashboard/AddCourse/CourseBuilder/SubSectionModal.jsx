import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../redux/slices/courseSlice";
import { RxCross1 } from "react-icons/rx";
import Upload from "../Upload";
import IconBtn from "../../../../common/IconBtn";

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        getValues,
    } = useForm();

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        if (view || edit) {
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, []);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if (currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl) {
            return true;
        }
        else {
            return false;
        }

    }
    const handleEditSubSection = async () => {

        const currentValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle);
        }

        if (currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc);
        }

        if (currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo);
        }

        setLoading(true);
        //API call
        let result = await updateSubSection(formData, token);
        console.log("RESULT>>>>", result);
        if (result?.success) {
            result = result.data;
            const updatedCourseContent = course.courseContent.map(section => section._id === result._id ? result : section);
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
            console.log("UPDATED COURSE>>>", updatedCourse);
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async (data) => {

        if (view)
            return;

        if (edit) {
            if (!isFormUpdated()) {
                toast.error("No changes made to the form")
            }
            else {
                //edit krdo store me 
                handleEditSubSection();
            }
            return;
        }

        //ADD

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        setLoading(true);
        //API CALL
        const result = await createSubSection(formData, token);

        if (result) {
            const updatedCourseContent = course.courseContent.map(section => section._id === modalData ? result.updatedSection : section);
            const updatedCourse = { ...course, courseContent: updatedCourseContent };
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);

    }

    return (
        <div className="text-white fixed inset-0 grid place-items-center bg-white bg-opacity-10 backdrop-blur-sm z-10">
            <div className="border border-richblack-400 bg-richblack-800 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <p>{view && "Viewing"}{edit && "Editing"}{add && "Adding"} Lecture</p>
                    <button type="button"
                        onClick={() => (!loading ? setModalData(null) : {})}>
                        <RxCross1 />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Upload
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : false}
                        editData={edit ? modalData.videoUrl : false}
                    />
                    <div>
                        <label htmlFor="lectureTitle"
                            className="text-richblack-5 text-sm leading-[1.375rem]">Lecture Title <sup className="text-pink-200">*</sup></label>
                        <input
                            id="lectureTitle"
                            type="text"
                            placeholder="Enter Lecture Title"
                            {...register("lectureTitle", { required: true })}
                            className="w-full p-3 mt-[6px] bg-richblack-700 text-richblack-5 rounded-lg font-medium"
                        />
                        {
                            errors.lectureTitle && <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture title is required</span>
                        }
                    </div>
                    <div>
                        <label htmlFor="lectureDesc"
                            className="text-richblack-5 text-sm leading-[1.375rem]">Lecture Description <sup className="text-pink-200">*</sup></label>
                        <textarea
                            id="lectureDesc"
                            placeholder="Enter Lecture Description"
                            rows={5}
                            {...register("lectureDesc", { required: true })}
                            className="w-full p-3 mt-[6px] bg-richblack-700 text-richblack-5 rounded-lg font-medium"
                        />
                        {
                            errors.courseShortDesc && <span className="ml-2 text-xs tracking-wide text-pink-200">Lecture Description is required</span>
                        }
                    </div>

                    {
                        !view && (
                            <IconBtn
                                disabled={loading ? true : false}
                                text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}
                            />
                        )
                    }
                </form>

            </div>
        </div>
    )
}

export default SubSectionModal
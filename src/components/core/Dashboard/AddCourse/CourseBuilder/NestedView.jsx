import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { MdEdit, MdKeyboardArrowDown } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlinePlus, AiOutlineMenuFold } from "react-icons/ai";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../redux/slices/courseSlice"

const NestedView = ({ handleChangeEditSectionName, cancelEdit }) => {

    const { course } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {

        const result = await deleteSection({ sectionId, courseId: course._id }, token);

        if (result?.success) {
            const updatedCourseContent = course.courseContent.filter(section => section._id !== sectionId);
            const updatedCourse = { ...course, courseContent: updatedCourseContent };

            dispatch(setCourse(updatedCourse));

            cancelEdit();
        }

        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId }, token);

        if (result?.success) {
            const updatedCourseContent = course.courseContent.map(section => {
                if (section._id === sectionId) {
                    const updatedSubSection = section.subSection.filter(subSection => subSection._id !== subSectionId);
                    return { ...section, subSection: updatedSubSection };
                }
                return section;
            })
            const updatedCourse = {...course, courseContent: updatedCourseContent};
            dispatch(setCourse(updatedCourse));
        }

        setConfirmationModal(null);
    }

    return (
        <div className="px-3 lg:px-6 bg-richblack-700 rounded-lg transition-all">
            {
                // Rendering each Section
                course?.courseContent?.map((section, index) => (
                    <details key={section._id} open={index === 0 ? true : false}>

                        <summary className="flex items-center justify-between gap-x-3 border-b-[1px] border-richblack-600 py-3">
                            <div className="flex items-center gap-x-3 ">
                                <AiOutlineMenuFold className="text-lg text-richblack-400" />
                                <p className="text-base font-semibold text-richblack-50">{section.sectionName}</p>
                            </div>

                            <div className="flex gap-x-3 items-center text-xl text-richblack-400">
                                <button
                                    type="button"
                                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                    <MdEdit className="hover:text-caribbeangreen-400 hover:scale-110 duration-200" />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setConfirmationModal({
                                        text1: "Delete this Section",
                                        text2: "All the lectures in this section will be deleted.",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                    })}
                                >
                                    <RiDeleteBin6Line className="hover:text-pink-300 hover:scale-110 duration-200" />
                                </button>

                                <span className="text-richblack-600">|</span>

                                <MdKeyboardArrowDown />
                            </div>
                        </summary>

                        {/* Rendering Sub-Sections for each Section */}
                        <div className="">
                            {
                                section?.subSection?.map((data) => (
                                    <div
                                        key={data?._id}
                                        onClick={() => setViewSubSection(data)}
                                        className="flex items-center justify-between border-b-[1px] border-richblack-600 py-3 pl-6"
                                    >
                                        <div className="flex items-center gap-x-3">
                                            <AiOutlineMenuFold className="text-lg text-richblack-400" />
                                            <p className="text-sm font-medium leading-[1.375rem] text-richblack-50">{data?.title}</p>
                                        </div>

                                        <div className="flex gap-x-3 items-center text-xl text-richblack-400" onClick={(e) => e.stopPropagation()}>
                                            <button onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                                <MdEdit className="hover:text-caribbeangreen-400 hover:scale-110 duration-200" />
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => setConfirmationModal({
                                                    text1: "Delete this Sub-Section",
                                                    text2: "Selected Lecture will be deleted.",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                })}>
                                                <RiDeleteBin6Line className="hover:text-pink-300 hover:scale-110 duration-200" />
                                            </button>

                                        </div>

                                    </div>
                                ))
                            }

                            <button
                                type="button"
                                onClick={() => setAddSubSection(section._id)}
                                className="flex gap-x-3 items-center text-yellow-50 py-4">
                                <AiOutlinePlus />
                                <p>Add Lecture</p>
                            </button>

                        </div>

                    </details>
                ))
            }

            {
                addSubSection ? (
                    <SubSectionModal
                        modalData={addSubSection}
                        setModalData={setAddSubSection}
                        add={true}
                    />
                ) :
                    viewSubSection ? (
                        <SubSectionModal
                            modalData={viewSubSection}
                            setModalData={setViewSubSection}
                            view={true}
                        />
                    ) :
                        editSubSection ? (
                            <SubSectionModal
                                modalData={editSubSection}
                                setModalData={setEditSubSection}
                                edit={true}
                            />
                        ) : (
                            <></>
                        )
            }
            {
                confirmationModal && (
                    <ConfirmationModal modalData={confirmationModal} />
                )
            }
        </div>
    )
}

export default NestedView
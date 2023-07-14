import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from "../../../../utils/constants"
import { BsClockFill } from "react-icons/bs"
import { FaCheckCircle } from "react-icons/fa"
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from 'react';
import ConfirmationModal from "../../../common/ConfirmationModal"
import { useSelector } from 'react-redux';
import { fetchInstructorCourses, deleteCourse } from "../../../../services/operations/courseDetailsAPI";
import { useNavigate } from 'react-router-dom';


const CoursesTable = ({ courses, setCourses }) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);

    const { token } = useSelector(state => state.auth);

    const handleDeleteCourse = async (courseId) => {

        setLoading(true);

        await deleteCourse({ courseId }, token);
        const result = await fetchInstructorCourses(token);

        if (!result?.success)
            return;

        setCourses(result?.data);
        setConfirmationModal(null);
        setLoading(false);
    }

    return (
        <div className="w-full">
            <Table className="w-full border-[1px] border-richblack-700 border-separate border-spacing-y-8 border-spacing-x-4">
                <Thead>
                    <Tr className="text-left text-richblack-100 text-sm font-medium leading-[157.143%] border-[1px] border-richblack-700 ">
                        <Th>Courses</Th>
                        <Th>Duration</Th>
                        <Th>Price</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody className="border-[1px] border-richblack-700">
                    {
                        courses.length === 0 ?
                            <Tr>
                                <Td>
                                    No Courses Found
                                </Td>
                            </Tr> :
                            courses?.map(course => (
                                <Tr key={course._id}>
                                    <Td className="flex gap-6">
                                        <img src={course.thumbnail} alt={course.courseName + "_thumbnail"} className='"h-[6.25rem] w-[8.8125rem]" lg:h-[148px] lg:w-[221px] object-center object-cover rounded-lg' />
                                        <div className='flex flex-col'>
                                            <p className='text-xl font-semibold text-richblack-5 leading-[140%] mb-2'>{course.courseName}</p>
                                            <p className='text-richblack-100 text-sm font-normal leading-[157.143%] mb-3'>{course.courseDescription}</p>
                                            <p className='mb-3 text-richblack-25 text-xs font-medium leading-[166.667%]'>Created: </p>
                                            <p className={`bg-richblack-700 px-2 py-[2px] font-medium text-xs leading-[166.667%] flex gap-[0.375rem] w-fit items-center rounded-full ${course.status === COURSE_STATUS.DRAFT ? "text-pink-100" : "text-yellow-100"}`}>
                                                {
                                                    (course.status === COURSE_STATUS.DRAFT ? <BsClockFill className='text-pink-50' /> : <FaCheckCircle className='text-yellow-50' />)
                                                }
                                                {course.status}
                                            </p>


                                        </div>
                                    </Td>

                                    <Td className="text-richblack-100 text-sm font-medium leading=[157.143%]">2h 30m</Td>

                                    <Td className="text-richblack-100 text-sm font-medium leading=[157.143%]">${course.price}</Td>

                                    <Td>
                                        <div className='flex gap-x-[0.625rem] text-richblack-400 items-center'>
                                            <button
                                                type="button"
                                                disabled={loading}
                                                onClick={() => {
                                                    navigate(`/dashboard/edit-course/${course._id}`)
                                                }}
                                            >
                                                <MdEdit className="hover:text-caribbeangreen-400 hover:scale-110 duration-200" fontSize={"1.375rem"} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setConfirmationModal({
                                                    text1: "Delete this Course",
                                                    text2: "All the data related top this course will be deleted.",
                                                    btn1Text: !loading ? "Delete" : "Loading...",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading ? () => handleDeleteCourse(course._id) : () => { },
                                                    btn2Handler: !loading ? () => setConfirmationModal(null) : () => { },
                                                })}>
                                                <RiDeleteBin6Line className="hover:text-pink-300 hover:scale-110 duration-200" fontSize={"1.375rem"} />
                                            </button>
                                        </div>
                                    </Td>
                                </Tr>
                            ))
                    }
                </Tbody>
            </Table>
            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </div >
    )
}

export default CoursesTable
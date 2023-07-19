import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '../../common/Spinner'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';

const EnrolledCourses = () => {

    const navigate = useNavigate();

    const { token } = useSelector(state => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await getUserEnrolledCourses(token, setEnrolledCourses);
                setEnrolledCourses(response);
                console.log(response);

            } catch (error) {
                console.log("Unable to Fetch Enrolled Courses.");
            }
        })();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='relative'>
            <h1 className="text-3xl font-medium text-richblack-5 lg:pl-8 my-8 lg:my-16">Enrolled Courses</h1>
            {
                !enrolledCourses
                    ?
                    <div>
                        <Spinner />
                    </div>
                    :
                    (
                        !enrolledCourses.length
                            ?
                            <div className='text-3xl text-richblack-400 text-center font-bold border-t-[1px] pt-[40%] lg:pt-[10%] '>
                                You aren't Enrolled into any Course
                            </div>
                            :
                            <div className='w-11/12 max-w-maxContent mx-auto border-[1px] border-richblack-700 rounded-lg'>
                                <div className='flex gap-2 lg:gap-0 text-richblack-50 text-sm font-medium leading-[157.143%] bg-richblack-700 rounded-tl-lg rounded-tr-lg'>
                                    <p className='w-[50%] lg:p-4 p-2'>Course Name</p>
                                    <p className='w-[20%] lg:p-4 p-2'>Duration</p>
                                    <p className='w-[30%] lg:p-4 p-2'>Progress</p>
                                </div>

                                {/* Cards Starts From Here */}
                                {
                                    enrolledCourses.map((course, idx) => (
                                        <div key={idx} className='flex items-center gap-2 lg:gap-0 w-full justify-between border-t-[1px] border-richblack-700'>
                                            <div className='flex text-base cursor-pointer font-medium w-[50%] lg:p-4 p-2 gap-5 gap-y-3 flex-wrap'
                                                onClick={() => navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}>
                                                <img src={course.thumbnail} alt="course_thumbnail" className='w-[52px] h-[52px] object-cover rounded-lg' />
                                                <div>
                                                    <p className='text-richblack-5'>{course.courseName}</p>
                                                    <p className='text-richblack-300'>{course.courseDescription.slice(0, 20)}...</p>
                                                </div>
                                            </div>

                                            <div className='text-richblack-50 text-base font-medium w-[20%] lg:p-4 p-2'>
                                                {course?.totalDuration}
                                            </div>

                                            <div className='flex flex-wrap gap-y-5 w-[30%] lg:p-4 p-2'>

                                                <div className='flex flex-col gap-1 lg:basis-2/3'>
                                                    <p className='text-richblack-50 text-xs font-semibold leading-[166.667%]'>Progress {course?.progressPercentage || 0}%</p>
                                                    <ProgressBar
                                                        completed={course.progressPercentage || 0}
                                                        height='8px'
                                                        isLabelVisible={false}
                                                    />
                                                </div>
                                                <button type='button' className='lg:basis-1/3 grid place-items-center text-richblack-200 text-2xl lg:pl-8 pl-4'>
                                                    <BiDotsVerticalRounded />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                    )
            }
        </div>
    )
}

export default EnrolledCourses
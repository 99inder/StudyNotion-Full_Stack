import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from '../../common/Spinner'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import ProgressBar from '@ramonak/react-progress-bar';

const EnrolledCourses = () => {

    const { token } = useSelector(state => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token, setEnrolledCourses);
            setEnrolledCourses(response);

        } catch (error) {
            console.log("Unable to Fetch Enrolled Courses.");
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return (
        <div className='text-white relative'>
            <h1 className="text-3xl font-medium text-richblack-5 lg:pl-8 my-12">Enrolled Courses</h1>
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
                            <div>
                                Not Enrolled in any Course
                            </div>
                            :
                            <div>
                                <div>
                                    <p>Course Name</p>
                                    <p>Duration</p>
                                    <p>Progress</p>
                                </div>

                                {/* Cards Starts From Here */}
                                {
                                    enrolledCourses.map((course, idx) => (
                                        <div>
                                            <div>
                                                <img src={course.thumbnail} alt="" />
                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <p>{course.courseDescription}</p>
                                                </div>
                                            </div>

                                            <div>
                                                {course?.totalDuration}
                                            </div>

                                            <div>
                                                <p>Progress {course?.progressPercentage || 0}%</p>
                                                <ProgressBar
                                                    completed={course.progressPercentage || 0}
                                                    height='8px'
                                                    isLabelVisible={false}
                                                />
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
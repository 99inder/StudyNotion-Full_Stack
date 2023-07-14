import { Link } from "react-router-dom"
import RatingStars from "../../common/RatingStars"
import GetAvgRating from "../../../utils/avgRating";
import { useEffect } from "react";
import { useState } from "react";

const CourseCard = ({ course, Height }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count);
        console.log("COURSE: ", course)
    }, [course])

    return (
        <div>
            <Link to={`/courses/${course._id}`}>
                <div className="mb-[50px]">
                    <div>
                        <img src={course?.thumbnail} alt={course?.courseName + "_thumbnail"}
                            className={`${Height} w-full rounded-xl object-cover`} />
                    </div>
                    <div className="mb-[0.625rem] mt-5">
                        <p className="text-richblack-5 text-base font-medium mb-2">{course?.courseName}</p>
                        <p className="text-richblack-300 mb-2">{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                        <div className="flex gap-x-2">
                            <span className="text-yellow-100 font-semibold text-base items-center">{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className="text-richblack-5 text-xl font-semibold">Rs. {course?.price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default CourseCard
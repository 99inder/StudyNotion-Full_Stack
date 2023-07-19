import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";
import RatingStars from "../components/common/RatingStars";
import { MdOutlineInfo } from 'react-icons/md'
import { FiGlobe } from 'react-icons/fi'
import Footer from "../components/common/Footer"
import { useState } from "react";
import { useEffect } from "react";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import Spinner from "../components/common/Spinner";
import ConfirmationModal from "../components/common/ConfirmationModal";
import formattedDate from "../utils/dateFormatter";
import CourseDetailsCard from "../components/core/CourseDetails/CourseDetailsCard";
import CourseAccordionBar from "../components/core/CourseDetails/CourseAccordionBar";

const CourseDetails = () => {

    const { token } = useSelector(state => state.auth);
    const { user, loading } = useSelector(state => state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { courseId } = useParams();


    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        // console.log("called", id)
        setIsActive(
            !isActive.includes(id)
                ? isActive.concat([id])
                : isActive.filter((e) => e !== id)
        )
    }

    const [courseData, setCourseData] = useState(null);
    const [avgRating, setAvgRating] = useState(0);
    const [totalNoOfSections, setTotalNoOfSections] = useState(0);
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);

    const [confirmationModal, setConfirmationModal] = useState(null);

    useEffect(() => {
        const getCourseFullDetails = async () => {
            try {
                const result = await fetchCourseDetails(courseId);
                setCourseData(result?.data);
                console.log("RESULT>>>", result.data)
            } catch (error) {
                console.log("Could not fetch Course Details");
            }
        }
        getCourseFullDetails();
    }, [courseId])

    useEffect(() => {
        const rating = GetAvgRating(courseData?.ratingAndReviews);
        setAvgRating(rating);

        let totalNoOfSections = 0;
        let totalNoOfLectures = 0;

        totalNoOfSections = courseData?.courseContent?.length || 0;
        courseData?.courseContent.forEach(sec => {
            totalNoOfLectures += sec.subSection?.length || 0
        });

        setTotalNoOfSections(totalNoOfSections);
        setTotalNoOfLectures(totalNoOfLectures);

        console.log("AVG RATING: ", rating);
        console.log("Sections Count>>", totalNoOfSections);
        console.log("Lectures Count>>", totalNoOfLectures);
    }, [courseData])

    const handleBuyCourse = async () => {
        if (token) {
            buyCourse([courseId], token, user, navigate, dispatch);
            return;
        }

        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }


    if (loading || !courseData) {
        return <div className="absolute top-[50%] left-[50%]">
            <div className="-translate-x-[50%]">
                <Spinner />
            </div>
        </div>
    }

    return (
        <div className="text-white">
            {/* PART 1 --- SECTION 1 */}
            <div className=" bg-richblack-800 flex">

                {/* COURSE INFO */}
                <div className="flex py-8 w-11/12 max-w-maxContent mx-auto relative mt-8">
                    {/* LEFT */}
                    <div className="flex flex-col gap-y-3 w-8/12 border-r-[1px] border-richblack-700 pr-6">
                        <h1 className="text-richblack-5 font-medium text-3xl leading-[126.667%]">{courseData?.courseName}</h1>

                        <p className="text-richblack-200 text-sm leading-[157.143%]">{courseData?.courseDescription}</p>

                        <div className="text-yellow-100 text-lg font-semibold leading-[144.444%]">
                            <div className="flex gap-x-2 items-center">
                                <span>{avgRating}</span>
                                <RatingStars Review_Count={avgRating} Star_Size={22} />
                                <span className="text-richblack-25 font-normal text-base">
                                    {`(${courseData?.ratingAndReviews.length} ratings) ${courseData?.studentsEnrolled.length} students`}
                                </span>
                            </div>
                        </div>

                        <p className="text-richblack-25 text-base">Created by {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}</p>

                        <div className="text-richblack-25 text-base">
                            <div className="flex gap-x-3 items-center">
                                <p className="flex gap-x-2 items-center"><MdOutlineInfo className="text-xl" /> <span>Created at {formattedDate(courseData?.createdAt)}</span></p>|
                                <p className="flex gap-x-2 items-center"><FiGlobe className="text-lg" /> <span>English</span></p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT CARD*/}
                    <div className="w-[30%] absolute right-0">
                        <CourseDetailsCard course={courseData} handleBuyCourse={handleBuyCourse} setConfirmationModal={setConfirmationModal} />
                    </div>
                </div>
            </div>

            {/* PART 2 */}
            <div className="w-11/12 max-w-maxContent mx-auto mb-28">

                {/*##### SECTION 2 ##### */}
                <div className="w-8/12">

                    {/* WHAT YOU WILL LEARN */}
                    <div className="p-8 border-[1px] border-richblack-700 mt-8">
                        <h3 className="mb-3 text-richblack-5 text-3xl leading-[126.667%] font-medium">What you'll learn</h3>
                        <ul className="flex flex-col gap-2">
                            {
                                courseData?.whatYouWillLearn.split("\n").map((e, idx) => (
                                    <li key={idx} className="text-richblack-50 text-sm leading-[157.143%] font-medium">{e}</li>
                                ))
                            }
                        </ul>
                    </div>

                    {/* COURSE CONTENT */}
                    <div className="mt-12">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-richblack-5 font-semibold text-2xl">Course Content</h3>
                            <div className="flex justify-between">
                                <p className="text-richblack-50 text-sm leading-[157.143%]">{totalNoOfSections} section(s) • {totalNoOfLectures} lecture(s) • 7h 57m total length</p>
                                <button onClick={() => setIsActive([])} className="text-yellow-50 text-sm leading-[157.143%] font-medium">Collapse all sections</button>
                            </div>
                        </div>
                        {/* NESTED SECTION */}
                        <div className="mt-4">
                            {courseData?.courseContent?.map((course, index) => (
                                <CourseAccordionBar
                                    course={course}
                                    key={index}
                                    isActive={isActive}
                                    handleActive={handleActive}
                                />
                            ))}
                        </div>
                    </div>

                    {/* AUTHOR */}
                    <div className="mt-6 flex flex-col gap-3">
                        <h5 className="text-richblack-5 font-semibold text-2xl">Author</h5>

                        <div className="flex gap-3 items-center">
                            <div className="overflow-hidden rounded-full aspect-square w-[3.25rem]">
                                <img src={courseData?.instructor?.image}
                                    alt="instructorImg.png"
                                    className="w-full h-full object-cover object-center"
                                />
                            </div>
                            <p className="text-richblack-5 text-base font-medium">
                                {courseData?.instructor?.firstName} {courseData?.instructor?.lastName}
                            </p>
                        </div>

                        <p className="text-richblack-50 text-sm leading-[157.143%]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur quam explicabo cupiditate asperiores, quaerat id, ipsa doloremque nobis officiis eaque placeat amet nesciunt laboriosam. Corrupti reiciendis dolore consectetur iure ab ipsum. Neque?</p>
                    </div>
                </div>

            </div>

            <div className="bg-richblack-800">
                <Footer />
            </div>

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }

        </div >
    )
}

export default CourseDetails
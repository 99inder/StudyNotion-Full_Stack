import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import { useNavigate } from "react-router-dom";
import { LuClock8 } from "react-icons/lu";
import { FaMobileAlt } from "react-icons/fa";
import { RxCursorArrow } from "react-icons/rx";
import { AiOutlineFileDone } from "react-icons/ai"
import { toast } from "react-hot-toast";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import { addToCart } from "../../../redux/slices/cartSlice";

const CourseCard = ({ course, handleBuyCourse, setConfirmationModal }) => {

    const { user } = useSelector(state => state.profile);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Instructors cannot buy the course.")
            return;
        }
        if (token) {
            dispatch(addToCart(course));
            return;
        }

        setConfirmationModal({
            text1: "Your are not logged-in",
            text2: "Please login to add to cart.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success('URL copied to clipboard');
            })
            .catch(() => {
                toast.error('Error copying URL to clipboard:');
            });
    }

    return (
        <div className="w-full bg-richblack-700 rounded-xl overflow-hidden">
            <div className="w-full h-[201px] bg-white">
                <img src={course?.thumbnail} alt="courseThumbnail.img"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="w-full p-6 flex flex-col gap-4">

                <p className="text-richblack-5 text-3xl leading-[126.667%] font-bold">Rs. {course?.price}</p>

                <div className="flex flex-col gap-3">
                    {
                        !course?.studentsEnrolled.includes(user?._id) &&
                        <IconBtn
                            text={"Add to Cart"}
                            type="button"
                            customClasses={"w-full !py-3"}
                            onclick={handleAddToCart}
                        />
                    }
                    <IconBtn
                        text={user && course?.studentsEnrolled?.includes(user?._id) ?
                            "Go to Course" :
                            "Buy Now"}
                        type="button"
                        onclick={user && course?.studentsEnrolled?.includes(user?._id) ?
                            () => navigate("/dashboard/enrolled-courses") :
                            handleBuyCourse
                        }
                        customClasses={"w-full !bg-richblack-800 !text-richblack-5 !py-3"}
                    />
                    <p className="text-center text-richblack-25 text-sm leading-[157.143%]">30-Day Money-Back Guarantee</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h5 className="text-richblack-5 text-base font-medium">This course includes:</h5>
                    <p className="text-sm text-caribbeangreen-100 font-medium leading-[157.143%] flex gap-2 items-center"><LuClock8 /> <span>8 hours on-demand video</span></p>
                    <p className="text-sm text-caribbeangreen-100 font-medium leading-[157.143%] flex gap-2 items-center"><RxCursorArrow /> <span>Full Lifetime access</span></p>
                    <p className="text-sm text-caribbeangreen-100 font-medium leading-[157.143%] flex gap-2 items-center"><FaMobileAlt /> <span>Access on Mobile and TV</span></p>
                    <p className="text-sm text-caribbeangreen-100 font-medium leading-[157.143%] flex gap-2 items-center"><AiOutlineFileDone /> <span>Certificate of completion</span></p>
                </div>

                <button className="py-3 text-yellow-100 font-medium" onClick={handleShare}>
                    Share
                </button>

            </div>
        </div>
    )
}

export default CourseCard
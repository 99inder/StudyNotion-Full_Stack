import { useDispatch, useSelector } from "react-redux"
import IconBtn from "../../../common/IconBtn"
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = () => {

    const { total, cart } = useSelector(state => state.cart);
    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBuyCourse = () => {
        const courses = cart.map(course => course._id);
        buyCourse(courses, token, user, navigate, dispatch);
    }

    return (
        <div className="lg:basis-1/4 p-6 rounded-lg bg-richblack-800 w-[90%] lg:mx-0 mx-auto lg:my-0 my-7 lg:max-w-[282px] h-fit">
            <div className="flex flex-col gap-1">
                <p className="text-richblack-200 text-sm font-semibold leading-[1.375rem]">Total:</p>
                <p className='text-yellow-50 text-2xl font-semibold'>Rs. {total}</p>
                <p className="line-through text-richblack-300 text-sm leading-[1.375rem]">Rs. {total}</p>
            </div>
            <button onClick={handleBuyCourse} className="mt-4 w-full">
                <IconBtn text="Buy Now" customClasses={"w-full"} />
            </button>
        </div>
    )
}

export default RenderTotalAmount
import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";

const Cart = () => {

    const { totalItems } = useSelector(state => state.cart);

    return (
        <div>
            <div className="px-6">
                <h1 className="text-3xl font-medium text-richblack-5 mb-3 lg:mb-9 mt-5 lg:mt-20">Your Cart</h1>
                <p className="text-richblack-400 text-base font-semibold mb-3">{totalItems} Courses in your cart</p>
            </div>
            <div className="h-[1px] bg-richblack-700 mb-6">
            </div>
            {
                totalItems > 0
                    ? (<div className="flex flex-wrap lg:flex-nowrap">
                        <RenderCartCourses />
                        <RenderTotalAmount />
                    </div>)
                    : (
                        <p className="text-3xl font-semibold text-richblack-200 text-center">
                            Your Cart is Empty
                        </p>
                    )
            }
        </div>
    )
}

export default Cart
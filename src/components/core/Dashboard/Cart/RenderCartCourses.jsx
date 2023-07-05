import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { removeFromCart } from "../../../../redux/slices/cartSlice"

const RenderCartCourses = () => {

    const { cart } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    return (
        <div className='lg:basis-3/4 flex flex-col'>
            {
                cart.map((course, index) => (
                    <div key={index}>
                        <div className='flex flex-wrap lg:flex-nowrap px-6 gap-5'>
                            <img src={course?.thumbnail} alt='course_thumbnail.jpg' className='w-[11.5625rem] h-full object-contain rounded-lg lg:basis-1/5 lg:order-1 order-1' />
                            <div className='flex flex-col gap-y-2 lg:basis-3/5 lg:order-2 order-3'>
                                <p className='text-richblack-5 font-medium text-lg leading-[1.625rem]'>{course?.courseName}</p>
                                <p className='text-richblack-300'>{course?.courseDescription}</p>
                                <div className='flex items-center gap-2'>
                                    <span className='text-yellow-100 font-semibold'>4.8</span>
                                    <ReactStars
                                        count={5}
                                        size={20}
                                        edit={false}
                                        activeColor="#E7C009"
                                        emptyIcon={<AiOutlineStar />}
                                        fullIcon={<AiFillStar />}
                                    />
                                    <span className='text-richblack-400'>{course?.ratingAndReviews?.length} Ratings</span>
                                </div>
                            </div>

                            <div className='lg:basis-1/5 lg:order-3 order-2'>
                                <button
                                    onClick={() => dispatch(removeFromCart(course._id))}
                                    className='flex items-center p-3 gap-x-2 rounded-lg bg-richblack-800 text-pink-200 font-medium'
                                >
                                    <RiDeleteBin6Line />
                                    <span>Remove</span>
                                </button>
                                <p className='mt-5 text-yellow-50 text-2xl font-semibold'>Rs. {course?.price}</p>
                            </div>
                        </div>

                        {
                            index < (cart.length - 1)
                            &&
                            <>
                                {/* Horizontal divide line */}
                                <div className='w-[93%] h-[1px] bg-richblack-700 my-[2.0625rem]'>
                                </div>
                            </>
                        }

                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses
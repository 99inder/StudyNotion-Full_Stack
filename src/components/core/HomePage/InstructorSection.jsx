import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../../common/Button"
import { FaArrowRight } from 'react-icons/fa'
import InstructorImage from "../../../assets/Images/Instructor.png"

const InstructorSection = () => {
    return (
        <div className='flex items-center justify-between py-24'>
            {/* LEFT */}
            <div className='basis-3/5'>
                <div className='bg-white w-fit'>
                    <img src={InstructorImage} alt="InstructorImage.png" className=' translate-x-[4%] translate-y-[4%] ' />
                </div>
            </div>

            {/* RIGHT */}
            <div className='basis-2/5 flex flex-col items-start gap-3'>
                <div className=' text-4xl font-semibold'>
                    <h6 >Become an </h6>
                    <HighlightText text={"instructor"} />
                </div>
                <p className=' text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>
                <div className=' mt-16 font-medium text-base'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex items-center justify-center gap-3'>
                            <p>Start Teaching Today</p>
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection
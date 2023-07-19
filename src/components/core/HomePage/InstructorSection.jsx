import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../../common/Button"
import { FaArrowRight } from 'react-icons/fa'
import InstructorImage from "../../../assets/Images/Instructor.png"

const InstructorSection = () => {
    return (
        <div className='flex flex-col md:flex-row md:items-center items-start justify-between py-24 md:gap-8 xl:gap-0'>
            {/* LEFT */}
            <div className='basis-3/5 order-2 flex md:block justify-center self-stretch md:order-1'>
                <div className='bg-white w-fit'>
                    <img src={InstructorImage} alt="InstructorImage.png" className='translate-x-[1%] translate-y-[1%] md:translate-x-[3%] md:translate-y-[3%] ' />
                </div>
            </div>

            {/* RIGHT */}
            <div className='basis-2/5 flex flex-col items-start gap-3 order-1 md:order-2 mb-8 md:mb-0'>
                <div className=' text-4xl font-semibold'>
                    <h6 >Become an </h6>
                    <HighlightText text={"instructor"} />
                </div>
                <p className=' text-richblack-300'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                </p>
                <div className=' mt-16 font-medium text-base hidden md:block'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div className='flex items-center justify-center gap-3'>
                            <p>Start Teaching Today</p>
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                </div>
            </div>
            <div className='mt-16 font-medium text-base md:hidden order-3'>
                <CTAButton active={true} linkto={"/signup"}>
                    <div className='flex items-center justify-center gap-3'>
                        <p>Start Teaching Today</p>
                        <FaArrowRight />
                    </div>
                </CTAButton>
            </div>
        </div>
    )
}

export default InstructorSection
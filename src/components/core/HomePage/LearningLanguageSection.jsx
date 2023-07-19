import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.svg"
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg"
import CTAButton from "../../common/Button"

const LearningLanguageSection = () => {
    return (
        <div className='flex flex-col items-center justify-center md:pb-[90px] pb-8'>
            <div className='w-full font-inter'>
                <h6 className='font-semibold text-4xl md:text-center mt-28'>Your swiss knife for <HighlightText text={"learning any language"} /></h6>
                <h6 className='font-medium text-base md:text-center mt-3 leading-6'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</h6>
            </div>

            <div className='flex flex-col lg:flex-row justify-center lg:w-full'>
                <img src={Know_your_progress} alt="Know_your_progress" className='lg:-mr-24 translate-y-14 lg:translate-y-0' />
                <img src={Compare_with_others} alt="Compare_with_others" className='z-[1]' />
                <img src={Plan_your_lessons} alt="Plan_your_lessons" className='lg:-ml-36 -translate-y-24 lg:-translate-y-0 z-[2]' />
            </div>

            <div className='-mt-[50px] md:mt-auto'>
                <CTAButton linkto={"/signup"} active={true}>Learn More</CTAButton>

            </div>

        </div>

    )
}

export default LearningLanguageSection
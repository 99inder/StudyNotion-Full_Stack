import React from 'react'
import HighlightText from './HighlightText'
import Know_your_progress from "../../../assets/Images/Know_your_progress.svg"
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg"
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg"
import CTAButton from "../../common/Button"

const LearningLanguageSection = () => {
    return (
        <div className='flex flex-col items-center justify-center pb-[90px]'>
            <div className='w-full font-inter'>
                <h6 className='font-semibold text-4xl text-center mt-28'>Your swiss knife for <HighlightText text={"learning any language"} /></h6>
                <h6 className='font-medium text-base text-center mt-3 leading-6'>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</h6>
            </div>

            <div className='flex justify-center w-full'>
                <img src={Know_your_progress} alt="Know_your_progress" className='-mr-32' />
                <img src={Compare_with_others} alt="Compare_with_others" />
                <img src={Plan_your_lessons} alt="Plan_your_lessons" className='-ml-36' />
            </div>

            <CTAButton linkto={"/signup"} active={true}>Learn More</CTAButton>
        </div>

    )
}

export default LearningLanguageSection
import React from 'react'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({ position, heading, subheading, codeblock, ctabtn1, ctabtn2, codeColor }) => {
    return (
        <div className={`flex ${position} justify-between `}>

            {/* LEFT SECTION */}
            <div className={`basis-[40%]`}>
                {heading}
                <div className=' mt-3 text-richblack-300 font-semibold text-base'>
                    {subheading}
                </div>

                {/* Buttons */}
                <div className='flex items-center gap-6 mt-16 '>

                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-3 text-center items-center justify-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>

                </div>
            </div>

            {/* RIGHT SECTION */}
            <div className='flex basis-1/2'>

                {/* HW: Add BG GRADIENT */}

                <div className='text-center flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono text-${codeColor} pr-2`} >
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        cursor={true}
                        style={
                            {
                                whiteSpace: 'pre-line',
                                display: "block",
                            }
                        }
                    />
                </div>

            </div>

        </div >
    )
}

export default CodeBlocks
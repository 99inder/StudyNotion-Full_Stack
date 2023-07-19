import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timelineData = [
    {
        id: 1,
        logo: Logo1,
        heading: "Leadership",
        content: "Fully committed to the success company",
    },
    {
        id: 2,
        logo: Logo2,
        heading: "Responsibility",
        content: "Students will always be our top priority",
    },
    {
        id: 3,
        logo: Logo3,
        heading: "Flexibility",
        content: "The ability to switch is an important skills",
    },
    {
        id: 4,
        logo: Logo4,
        heading: "Solve the problem",
        content: "Code your way to a solution",
    },
]

const TimelineSection = () => {
    return (
        // Timeline Section
        <div className='flex flex-col md:flex-row w-full pb-20 mt-16 gap-y-[76px]'>

            {/* LEFT SECTION */}
            <div className='flex flex-col gap basis-2/5 justify-center'>

                {/* Card */}
                {
                    timelineData.map((e, index) => {
                        return (
                            <div key={e.id} className='flex flex-col'>
                                <div className='flex gap-3 items-center justify-start' >
                                    <div className='flex items-center justify-center w-[52px] h-[52px] bg-white rounded-full drop-shadow-2xl'>
                                        <img src={e.logo} alt='logo' />
                                    </div>

                                    <div className='flex flex-col'>
                                        <p className=' text-lg font-semibold'>{e.heading}</p>
                                        <p className=' text-sm font-normal'>{e.content}</p>
                                    </div>
                                </div>

                                {/* Dashed Lines */}
                                {
                                    index < (timelineData.length - 1) &&
                                    <div className='h-[64px] w-[52px] flex items-center justify-center'>
                                        <div className='w-[42px] border-[1px] rotate-90 border-dashed border-richblack-100'>
                                        </div>
                                    </div>
                                }
                            </div>
                        )
                    })
                }


            </div>


            {/* RIGHT SECTION */}
            <div className='basis-3/5 shadow-blue-200 relative'>

                <div>
                    <img src={timelineImage} alt="timeline.img" className='object-fit'/>
                </div>

                {/* GREEN OVERLAPPING BAR */}
                <div className='absolute left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col lg:flex-row items-center justify-evenly gap-5 lg:gap-[2.625rem] bg-caribbeangreen-700 p-6 lg:p-[2.625rem]'>

                    <div className='flex items-center justify-center gap-6'>
                        <p className=' font-bold text-4xl text-white tracking-tight'>10</p>
                        <div className='flex flex-col font-medium text-sm text-caribbeangreen-300'>
                            <p>YEARS</p>
                            <p>EXPERIENCES</p>
                        </div>
                    </div>

                    <div className=' border-t-2 w-[44px] lg:rotate-90 border-caribbeangreen-300'>
                    </div>

                    <div className='flex items-center justify-center gap-6'>
                        <p className='font-bold text-4xl text-white tracking-tight'>250</p>
                        <div className='flex flex-col font-medium text-sm text-caribbeangreen-300'>
                            <p>TYPES OF</p>
                            <p>COURSES</p>
                        </div>
                    </div>

                </div>


            </div>

        </div>
    )
}

export default TimelineSection
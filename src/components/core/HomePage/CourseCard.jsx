import React from 'react'
import { MdPeopleAlt, MdOutlinePlayLesson } from "react-icons/md"

const CourseCard = ({ currentCard, setCurrentCard, e }) => {
    return (

        <div onClick={() => setCurrentCard(e.heading)} className={`relative min-w-[341.33px] h-[300px] flex flex-col justify-between basis-1/5 text-start font-inter cursor-pointer`}>

            <div className={`z-20 w-full h-full flex flex-col justify-between ${currentCard === e.heading ? "bg-white" : "bg-richblack-800"}`}>

                <div className='px-6 pt-8'>
                    <h3 className={`font-semibold ${currentCard === e.heading ? "text-richblack-800" : "text-richblack-25"}`}>{e.heading}</h3>
                    <p className={`leading-6 mt-3 ${currentCard === e.heading ? "text-richblack-500" : "text-richblack-400"}`}>{e.description}</p>
                </div>


                <div className='border-t-[1px] border-dashed border-richblack-100 mt-20 py-4 font-medium'>
                    <div className={`flex justify-around px-4 ${currentCard === e.heading ? "text-blue-300" : "text-richblack-400"}`}>
                        <div className='flex items-center justify-center gap-2'>
                            <MdPeopleAlt />
                            <p>{e.level}</p>
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                            <MdOutlinePlayLesson />
                            <p>{e.lessionNumber} Lessons</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* BORDER */}
            <div
                className={`absolute w-full h-full bg-yellow-50 ${currentCard === e.heading ? "translate-x-3 translate-y-3 duration-300" : ""}  z-10`}
            >
            </div>
        </div>
    )
}

export default CourseCard
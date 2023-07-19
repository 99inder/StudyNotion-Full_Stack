import React from 'react'
import HighlightText from './HighlightText'
import { useState } from 'react';
import { HomePageExplore } from "../../../data/homepage-explore"
import CourseCard from './CourseCard';

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths",
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

    return (
        <div className='relative md:text-center w-full mt-32 md:pt-32 md:mt-32'>

            <h3 className='text-4xl font-semibold'>Unlock the <HighlightText text={"Power of Code"} /></h3>

            <p className=' font-medium text-base text-richblack-300 mt-2'>
                Learn to Build Anything You Can Imagine
            </p>

            {/* TABS */}
            <div className='flex flex-wrap lg:w-2/3 mx-auto md:gap-x-3 justify-evenly bg-richblack-800 rounded-full mb-5 mt-10'>
                {
                    tabsName.map((e, index) => {
                        return (
                            <div key={index} className={`${currentTab === e ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200 hover:bg-richblack-700"} rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5 my-2 mx-2 py-1 px-2 md:px-7`} id={index} value={e} onClick={() => setMyCards(e)}>
                                {e}
                            </div>
                        )
                    })
                }
            </div>

            {/* TAB CARDS */}
            <div className='h-[800px] md:h-[600px] lg:h-[230px] mt-20'>
                <div className='absolute flex flex-wrap justify-around items-center font-inter gap-y-10'>
                    {
                        courses.map((e, index) => {
                            return (
                                <CourseCard key={index} currentCard={currentCard} setCurrentCard={setCurrentCard} e={e} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ExploreMore
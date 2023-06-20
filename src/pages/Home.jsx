import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ReviewsSlider from '../components/core/HomePage/ReviewsSlider';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className='realtive mx-auto flex flex-col w-11/12 items-center justify-between text-white max-w-maxContent'>
        <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
          <Link to="/signup">
            <div className=' flex items-center justify-center rounded-full gap-2 px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </Link>
        </div>

        <div className='text-center text-4xl font-semibold mt-9'>
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        <div className=' w-[90%] mt-4 text-center text-richblack-300 font-semibold text-base leading-6'>
          With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className='flex gap-7 mt-9'>
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>
        {/* <div className='bg-white w-fit'> */}
        <div className='mx-3 my-14 bg-white md:translate-x-[20px] md:translate-y-[20px] '>
          <video src={Banner} autoPlay muted loop className=' md:-translate-x-[20px] md:-translate-y-[20px]'></video>
        </div>

        {/* Code Section 1 */}
        <div className=' mt-36 w-full'>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className='text-4xl font-semibold'>
                Unlock Your <HighlightText text={"coding potential"} /> with our online courses
              </div>
            }
            subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            ctabtn1={
              {
                btnText: "Try it Yourself",
                linkto: "/signup",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "Learn More",
                linkto: "/login",
                active: false
              }
            }
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}

            codeColor={"yellow-50"}
          />
        </div>

        {/* Code Section 2 */}
        <div className='mt-60 w-full'>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className='text-4xl font-semibold'>
                Start <HighlightText text={`coding in seconds`} />
              </div>
            }
            subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            ctabtn1={
              {
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true
              }
            }
            ctabtn2={
              {
                btnText: "Learn More",
                linkto: "/login",
                active: false
              }
            }
            codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>\n</h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}

            codeColor={"yellow-50"}
          />
        </div>

        <ExploreMore />


      </div>

      {/* Section 2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage_bg h-52 lg:h-80'>

          <div className='w-11/12 max-w-maxContent h-full flex flex-col justify-center items-center mx-auto '>

            <div className='flex items-center justify-center gap-7'>

              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex gap-3 items-center">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>

              <CTAButton className="flex gap-3" linkto={"/login"}>
                Learn More
              </CTAButton>

            </div>

          </div>
        </div>

        {/* Get the skills you need section */}
        <div className='w-11/12 mx-auto max-w-maxContent flex flex-col justify-center items-center gap-5 mt-[90px]'>
          <div className='flex justify-evenly'>

            {/* Left Part */}
            <div className='w-[40%]  font-inter font-semibold text-3xl'>
              Get the skills you need for a <HighlightText text={"job that is in demand."} />
            </div>

            {/* Right Part */}
            <div className='flex flex-col basis-1/2 gap-12 items-start'>

              <div className=' font-inter text-base font-medium text-richblack-700 '>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
              </div>


              <CTAButton linkto={"/signup"} active={true}>
                Learn More
              </CTAButton>


            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />


        </div>
      </div>

      {/* Section 3 */}
      <div className='w-11/12 max-w-maxContent mx-auto bg-richblack-900 text-white flex flex-col items-center'>

        <InstructorSection />

        <h4 className='font-bold text-4xl text-richblack-100 mt-32 mb-14'>Reviews for other learners</h4>
        <ReviewsSlider />

      </div>

      {/* Footer */}
      <Footer />
    </div >
  )
}

export default Home
import HighlightText from "../components/core/HomePage/HighlightText";
import image1 from "../assets/Images/aboutus1.webp";
import image2 from "../assets/Images/aboutus2.webp";
import image3 from "../assets/Images/aboutus3.webp";
import foundingImg from "../assets/Images/FoundingStory.png";
import Quote from "../components/core/AboutPage/Quote";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactUsFormSection from "../components/core/AboutPage/ContactUsFormSection";

const About = () => {

    return (
        <div>
            {/* SECTION 1 */}
            <section className="bg-richblack-800 pt-20">
                <div className="w-11/12 max-w-maxContent mx-auto">

                    <div className="flex flex-col items-center gap-[2.375rem] self-stretch">

                        <h1 className="py-[0.375rem] px-[1.125rem] text-richblack-100">About us</h1>

                        <div className="flex flex-col items-center px-[3.25rem] gap-4 text-center max-w-[57.0625rem]">
                            <h3 className="self-stretch text-richblack-5 text-4xl leading-[2.75rem] -tracking-[0.045rem] font-semibold">
                                Driving Innovation in Online Education for a <HighlightText text={'Brighter Future'} />
                            </h3>

                            <p className="self-stretch text-richblack-300 text-base font-medium">
                                Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                            </p>

                        </div>
                    </div>

                    <div className="relative">
                        <div className="flex justify-between gap-x-6 flex-wrap absolte">
                            <img src={image1} alt="aboutus_img1" loading="lazy" />
                            <img src={image2} alt="aboutus_img2" loading="lazy" />
                            <img src={image3} alt="aboutus_img3" loading="lazy" />
                        </div>
                    </div>

                </div>
            </section>

            {/* SECTION 2 */}
            <section>
                <div className="w-11/12 max-w-maxContent mx-auto">

                    <Quote />

                    <div className="py-[5.625rem] px-[7.5rem]">

                        <div className="flex flex-wrap justify-between gap-x-24">

                            {/* LEFT */}
                            <div className="basis-5/12">
                                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-4xl leading-[2.75rem] font-semibold mb-6">
                                    Our Foundation Story
                                </h3>

                                <div className="text-richblack-300 text-base font-medium ">
                                    <p>
                                        Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                                    </p>
                                    <p className="mt-4">
                                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                                    </p>
                                </div>

                            </div>

                            {/* RIGHT */}
                            <div className="lg:basis-5/12 flex items-center justify-start">
                                <img src={foundingImg} alt="founding.img" />

                            </div>

                        </div>

                    </div>

                    <div className="py-[5.625rem] lg:px-[7.5rem]">
                        <div className="xs:text-center lg:text-left flex flex-wrap gap-y-16 justify-between">

                            {/* LEFT */}
                            <div className="lg:basis-[30.375rem] lg:pl-6">
                                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00] to-[#F9D423] text-4xl leading-[2.75rem] font-semibold mb-6">
                                    Our Vision
                                </h3>

                                <p className="text-richblack-300 text-base font-medium ">
                                    With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                                </p>

                            </div>

                            {/* RIGHT */}
                            <div className="lg:basis-[30.375rem] lg:pr-6">
                                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-4xl leading-[2.75rem] font-semibold mb-6">
                                    Our Mission
                                </h3>

                                <p className="text-richblack-300 text-base font-medium ">
                                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                                </p>
                            </div>


                        </div>

                    </div>

                </div>
            </section>

            {/* SECTION 3 */}
            <section className="bg-richblack-800 xs:py-12 lg:py-[5/626rem]">
                <div className="w-11/12 max-w-maxContent mx-auto">
                    <StatsComponent />
                </div>
            </section>

            {/* SECTION 4 */}
            <section className="py-[5.625rem] w-11/12 max-w-maxContent mx-auto">
                <LearningGrid />
                <ContactUsFormSection />
            </section>

        </div>
    )
}

export default About
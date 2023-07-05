import ContactUsForm from "../components/common/ContactPage/ContactUsForm"
import { HiChatBubbleLeftRight } from "react-icons/hi2"
import { BsGlobeAmericas, BsFillTelephoneFill } from "react-icons/bs"

const ContactUs = () => {
    return (
        <div className='w-11/12 max-w-maxContent mx-auto'>
            <div className='flex lg:flex-row lg:items-start flex-col items-center justify-between py-10 lg:py-[5.625rem] gap-[3.25rem]'>
                {/* LEFT */}
                <div className='lg:p-6 lg:w-[40%] p-8 bg-richblack-800 rounded-xl h-fit lg:order-1 order-2'>

                    <div className="flex gap-[0.5625rem]">
                        <HiChatBubbleLeftRight className="text-2xl text-richblack-100" />
                        <div>
                            <h5 className='text-lg leading-[1.625rem] font-semibold text-richblack-5'>Chat on us</h5>
                            <div className='text-sm leading-[1.375rem] text-richblack-200'>
                                <p className='font-medium'>Our friendly team is here to help.</p>
                                <p className='font-semibold'>@mail address</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-[0.5625rem]">
                        <BsGlobeAmericas className="text-2xl text-richblack-100" />
                        <div>
                            <h5 className='text-lg leading-[1.625rem] font-semibold text-richblack-5'>Visit us</h5>
                            <div className='text-sm leading-[1.375rem] text-richblack-200'>
                                <p className='font-medium'>Come and say hello at our office HQ.</p>
                                <p className='font-semibold'>Here is the location/ address</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-[0.5625rem]">
                        <BsFillTelephoneFill className="text-2xl text-richblack-100" />
                        <div>
                            <h5 className='text-lg leading-[1.625rem] font-semibold text-richblack-5'>Call us</h5>
                            <div className='text-sm leading-[1.375rem] text-richblack-200'>
                                <p className='font-medium'>Mon - Fri From 8am to 5pm</p>
                                <p className='font-semibold'>+123 456 7890</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* RIGHT */}
                <div className='lg:p-[3.25rem] lg:border border-richblack-600 rounded-xl lg:order-2 order-1'>
                    <h4 className="text-richblack-5 text-4xl leading-[2.75rem] font-semibold -tracking-[0.045rem]">
                        Got a Idea? We’ve got the skills.<br />Let’s team up
                    </h4>
                    <p className="text-base font-medium text-richblack-300 mt-3 mb-8">Tall us more about yourself and what you’re got in mind.</p>

                    <ContactUsForm />
                </div>
            </div>
        </div>
    )
}

export default ContactUs
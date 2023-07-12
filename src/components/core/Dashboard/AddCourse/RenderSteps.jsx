import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"
import { AiOutlineLeft } from "react-icons/ai"
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./Publish Course";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import { Link } from "react-router-dom";

const RenderSteps = () => {

    const stepsData = [{
        id: 1,
        title: "Course Information"
    },
    {
        id: 2,
        title: "Course Builder"
    },
    {
        id: 3,
        title: "Publish"
    }];

    const { step } = useSelector(state => state.course);

    const inactiveCss = {
        step: "font-normal text-richblack-300 bg-richblack-800 border-richblack-700",
        title: "text-richblack-500"
    };
    const activeCss = {
        step: "font-semibold text-yellow-50 bg-yellow-900 border-yellow-50",
        title: "text-richblack-5"
    };

    const stepCompletedCss = "font-semibold text-yellow-900 bg-yellow-50";

    return (
        <div>
            <Link to="#" className="flex gap-2 text-sm text-richblack-300 leading-[1.375rem] lg:pb-6 pb-3">
                <AiOutlineLeft className="my-auto" />
                <span>Back to Dashboard</span>
            </Link>
            
            <div className="grid grid-cols-3 grid-rows-2 place-items-center
                        text-lg leading-[1.625rem] relative mt-3 lg:mb-8 mb-5">
                {
                    stepsData.map((item, i) => (
                        <div key={i} className="w-[34px] h-[34px] text-center">
                            <div className={`w-full h-full flex items-center justify-center border-[1px] rounded-full ${step > item.id ? stepCompletedCss : (item.id <= step ? activeCss.step : inactiveCss.step)} `}>
                                {
                                    item.id < step
                                        ?
                                        <FaCheck />
                                        :
                                        <p>{item.id}</p>
                                }
                            </div>
                        </div>
                    ))
                }
                {
                    stepsData.map((item, i) => (
                        <p key={i}
                            className={`text-sm leading-[1.375rem] font-normal ${item.id <= step ? activeCss.title : inactiveCss.title}`}>
                            {item.title}
                        </p>
                    ))
                }
                <div className={`h-[1px] absolute top-[25%] left-[23%] lg:left-[20%] border-t-[1px] border-dashed ${step >= 2 ? "border-yellow-50" : "border-richblack-600"} w-[20%] lg:w-[27%]`}>
                </div>
                <div className={`h-[1px] absolute top-[25%] left-[57%] lg:left-[53%] border-t-[1px] border-dashed ${step >= 3 ? "border-yellow-50" : "border-richblack-600"}  w-[20%] lg:w-[27%]`}>
                </div>
            </div>

            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 && <PublishCourse />}
        </div >
    )
}

export default RenderSteps
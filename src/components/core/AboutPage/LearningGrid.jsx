import HighlightText from "../HomePage/HighlightText"
import CTAButton from "../../common/Button"

const LearningGrid = () => {

    const LearningGridArray = [
        {
            order: -1,
            heading: "World-Class Learning for",
            highlightText: "Anyone, Anywhere",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText: "Learn More",
            BtnLink: "/",
        },
        {
            order: 1,
            heading: "Curriculum Based on Industry Needs",
            description:
                "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            order: 2,
            heading: "Our Learning Methods",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 3,
            heading: "Certification",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 4,
            heading: `Rating "Auto-grading"`,
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
        {
            order: 5,
            heading: "Ready to Work",
            description:
                "Studynotion partners with more than 275+ leading universities and companies to bring",
        },
    ];

    return (
        <div className="grid grid-col-1 lg:grid-cols-4 text-white lg:py-[5.625rem]">

            {
                LearningGridArray.map((e, idx) => {
                    if (idx === 0) {
                        return (
                            <div key={idx} className="lg:col-span-2 p-8  lg:min-h-[18.375rem]">
                                <h4 className="mb-3 text-3xl lg:text-4xl leading-[2.75rem] -tracking-[0.045rem] font-semibold">{e.heading}<br /><HighlightText text={e.highlightText}></HighlightText></h4>
                                <p className="text-richblack-300 text-base font-medium">
                                    {e.description}
                                </p>
                                <div className="w-fit mt-9">
                                    <CTAButton linkto={e.BtnLink} active={true}>{e.BtnText}</CTAButton>
                                </div>
                            </div>
                        )
                    }

                    return (
                        <div
                            key={idx}
                            className={`${idx === 3 && "lg:col-start-2"} ${idx % 2 === 0 ? "bg-richblack-700" : "bg-richblack-800"} p-8 lg:min-h-[18.375rem]`}
                        >
                            <h5 className="text-lg leading-[1.625rem] font-semibold text-richblack-5">
                                {e.heading}
                            </h5>
                            <p className="text-sm leading-[1.375rem] text-richblack-100 mt-8">
                                {e.description}
                            </p>

                        </div>
                    )


                })

            }
        </div>
    )
}

export default LearningGrid
const StatsComponent = () => {

    const statsData = [
        {
            count: "5K",
            label: "Active Students",
        },
        {
            count: "10+",
            label: "Mentors",
        },
        {
            count: "200+",
            label: "Courses",
        },
        {
            count: "50+",
            label: "Awards",
        },
    ]

    return (
        <div className="flex lg:flex-row xs:flex-col flex-wrap items-center justify-between gap-[0.625rem]">
            {
                statsData.map((elem, idx) => (
                    <div key={idx} className="text-center">
                        <p className="text-richblack-5 text-3xl leading-[2.375rem] font-bold">{elem.count}</p>
                        <p className="text-richblack-500 text-base font-semibold mt-3">{elem.label}</p>
                    </div>
                ))
            }

        </div>
    )
}

export default StatsComponent
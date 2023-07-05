import OpenComa from "../../../assets/OpenningCommas.svg"
import CloseComa from "../../../assets/ClosingCommas.svg"
const Quote = () => {
    return (
        <div className="relative lg:px-[7.5rem] py-[5.625rem] text-richblack-100 text-center text-3xl leading-[3.25rem] -tracking-[0.045rem]" >
            <img src={OpenComa} alt="openComa.svg" className="absolute lg:left-[11%]"/>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">
                {" "}
                combines technology
            </span>,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF512F] to-[#F09819]">
                {" "}
                expertise
            </span>,
            and community to create an
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E65C00] to-[#F9D423]">
                {" "}
                unparalleled educational experience.
            </span>
            <img src={CloseComa} alt="closeComa.svg" className="absolute lg:right-[30%] bottom-[7.8125rem] xs:right-[23%]"/>
        </div>
    )
}

export default Quote
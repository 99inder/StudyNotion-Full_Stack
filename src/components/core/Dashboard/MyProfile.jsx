import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { FiEdit } from "react-icons/fi"

const MyProfile = () => {

    const { user } = useSelector(state => state.profile);
    const navigate = useNavigate();

    return (
        <div className='text-white'>

            <h1 className="text-3xl font-medium text-richblack-5 lg:pl-8 my-12">My Profile</h1>

            <div className="mx-auto w-11/12 max-w-[1000px] py-10">
                {/* SECTION 1 */}
                <div className="flex items-center lg:p-6 gap-5 bg-richblack-800 rounded-lg justify-between mb-5">
                    <div className="flex items-center lg:gap-6">
                        <img src={user?.image} alt={`profile-${user?.firstName}`} className="aspect-square w-[78px] rounded-full object-cover" />

                        <div>
                            <p className="text-lg font-semibold leading-[1.625rem] text-richblack-5">{user?.firstName + " " + (user?.lastName ?? "")}</p>
                            <p className="text-sm text-richblack-300 leading-[1.375rem]">{user?.email}</p>
                        </div>
                    </div>

                    <IconBtn
                        text="Edit"
                        onclick={() => navigate("/dashboard/settings")}
                    >
                        <FiEdit />

                    </IconBtn>
                </div>

                {/* SECTION 2 */}
                <div className="bg-richblack-800 rounded-lg lg:p-6">
                    <div className="flex flex-wrap justify-between items-center mb-5">
                        <p className="text-richblack-5 text-lg font-semibold ">Personal Details</p>
                        <IconBtn
                            text="Edit"
                            onclick={() => navigate("/dashboard/settings")}
                        >
                            <FiEdit />
                        </IconBtn>
                    </div>

                    <div className="flex flex-wrap text-sm leading-[1.375rem] gap-y-5">
                        <div className="basis-1/2">
                            <p className="text-richblack-600 font-normal">First Name</p>
                            <p className="text-richblack-5 font-medium">{user?.firstName}</p>
                        </div>
                        <div className="basis-1/2">
                            <p className="text-richblack-600 font-normal">Last Name</p>
                            <p className="text-richblack-5 font-medium">{user?.lastName ?? "Add last name"}</p>
                        </div>
                        <div className="basis-1/2">
                            <p className="text-richblack-600 font-normal">Email</p>
                            <p className="text-richblack-300 font-medium select-none">{user?.email}</p>
                        </div>
                        <div className="basis-1/2">
                            <p className="text-richblack-600 font-normal">Phone Number</p>
                            <p className="text-richblack-5 font-normal">{user?.contactNumber ?? "Add phone number"}</p>
                        </div>
                        <div className="basis-1/2">
                            <p className="text-richblack-600 font-normal">Gender</p>
                            <p className="text-richblack-5 font-normal">{user?.contactNumber ?? "Add gender"}</p>
                        </div>
                        <div className="basis-1/2">
                            <p className="text-richblack-600 font-normal">Date Of Birth</p>
                            <p className="text-richblack-5 font-normal">{user?.contactNumber ?? "Add Date Of Birth"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile
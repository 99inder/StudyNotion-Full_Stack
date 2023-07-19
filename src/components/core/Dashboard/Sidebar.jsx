import { useDispatch, useSelector } from "react-redux";
import Spinner from '../../common/Spinner';
import { sidebarLinks } from "../../../data/dashboard-links";
import SidebarLink from "./SidebarLink";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import { AiFillCaretRight } from "react-icons/ai";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useState } from "react";
import { logout } from "../../../services/operations/authAPI";

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (authLoading || profileLoading)
        return <Spinner />

    return (
        <>
            <div className={`lg:relative z-[115] absolute left-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}  lg:translate-x-0 transition-all duration-200`}>
                <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700  h-[calc(100vh-3.5rem)] bg-richblack-800 py-10">

                    <div className="flex flex-col">
                        {
                            sidebarLinks.map(link => {
                                if (link.type && user?.accountType !== link.type)
                                    return null

                                return <SidebarLink key={link.id} name={link.name} path={link.path} iconName={link.icon} />
                            })
                        }
                    </div>

                    <div className="w-10/12 bg-richblack-600 mx-auto my-6 h-[1px]"></div>

                    <div className="flex flex-col">
                        <SidebarLink name="Settings" path="/dashboard/settings" iconName="VscSettingsGear" />

                        <button onClick={() => setConfirmationModal({
                            text1: "Are you sure?",
                            text2: "You'll be logged out of your account.",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })}
                            className="text-sm font-medium text-richblack-300"
                        >
                            <div className="px-6 py-3 flex items-center gap-3 font-medium leading-[1.375rem]">
                                <VscSignOut className="text-base" />
                                <span className='text-sm font-medium'>Logout</span>
                            </div>
                        </button>
                    </div>

                </div>

                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
            </div>

            <div
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className={`lg:hidden bg-yellow-50 w-[35px] h-[30px] absolute z-[116] top-[50vh] left-0 rounded-tr-full rounded-br-full -translate-x-4 `}>
                <div className={`w-full h-full flex items-center  text-xl ${isSidebarOpen ? "rotate-180" : "justify-end"}`}>
                    <AiFillCaretRight />
                </div>
            </div>
        </>
    )
}

export default Sidebar
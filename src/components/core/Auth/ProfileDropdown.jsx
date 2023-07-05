import { useDispatch, useSelector } from "react-redux";
import { AiFillCaretDown } from 'react-icons/ai';
import { VscDashboard, VscSignOut } from 'react-icons/vsc';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { useRef } from "react";

const ProfileDropdown = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const { user } = useSelector(state => state.profile);

  console.log(user);

  const [isOpen, setIsOpen] = useState(false);
  useOnClickOutside(ref, () => setIsOpen(false));

  if (!user)
    return null;

  return (
    <div onClick={() => setIsOpen(prev => !prev)} className="relative cursor-pointer z-10">
      <div className="flex items-center gap-2 ">
        <img className="w-[2rem] rounded-full" src={user.image} alt="user_img" />
        <AiFillCaretDown className={`${isOpen ? 'rotate-180' : ''} transition-all duration-200`} />
      </div>

      {
        isOpen
        &&
        <div className="absolute right-0 top-10 text-sm tracking-[0.05rem] text-richblack-100 border-[1px] border-richblack-700 rounded-lg bg-richblack-800 divide-richblack-700 divide-y-[1px] flex flex-col" ref={ref}>
          <Link to={'/dashboard/my-profile'} className="flex items-center justify-start gap-3 py-3 px-4 hover:bg-richblack-700">
            <VscDashboard className="text-lg" />
            <p>Dashboard</p>
          </Link>
          <div className="flex items-center justify-start gap-3 py-3 px-4 hover:bg-richblack-700" onClick={() => {
            dispatch(logout(navigate))
            setIsOpen(false)
          }}>
            <VscSignOut className="text-lg" />
            <p>Logout</p>
          </div>
        </div>
      }


    </div>
  )
}

export default ProfileDropdown
import React from 'react'
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({ name, path, iconName }) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <NavLink
            className={`px-6 py-3 flex items-center gap-3 font-medium leading-[1.375rem] ${matchRoute(path) ? "bg-yellow-800 text-yellow-50 border-l-[2px] border-l-yellow-50" : "text-richblack-300"}`}
            to={path}
        >
            <Icon className="text-base"/>
            <span className='text-sm'>{name}</span>
        </NavLink>
    )
}

export default SidebarLink
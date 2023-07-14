import React, { useState } from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { useEffect } from 'react'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { BsChevronDown } from 'react-icons/bs'

const Navbar = () => {

    const location = useLocation();

    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const { totalItems } = useSelector(state => state.cart);

    const [catalogLinks, setCatalogLinks] = useState([]);

    const fetchSublinks = async () => {
        try {
            const { data } = await apiConnector("GET", categories.CATEGORIES_API);

            let requiredData = data.allCategories.map(category => ({title: category.name, link: `/catalog/${category.name.replace(" ", "-").toLowerCase()}`}));

            setCatalogLinks(requiredData);

        } catch (error) {
            console.log("Failed to fetch Catalog Data.")
        }
    }

    useEffect(() => {
        fetchSublinks();
    }, [])

    return (
        <div className={`flex h-[3.5rem] py-4 border-b-[1px] border-richblack-700 text-white ${(location.pathname === '/' || location.pathname === '/contact') ? "" : "bg-richblack-800"} transition-all duration-200`}>

            <div className='w-11/12 max-w-maxContent mx-auto flex justify-between items-center'>

                {/* LOGO */}
                <Link to="/">
                    <img src={Logo} alt="Logo.svg" />
                </Link>

                {/* NAVIGATION */}
                <nav>
                    <ul className='flex gap-x-10 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog"
                                            ?
                                            (
                                                <div className='cursor-pointer relative group'>
                                                    <div className='flex items-center justify-center gap-2'>
                                                        <p>{link.title}</p>
                                                        <BsChevronDown />
                                                    </div>

                                                    <div className='absolute z-20 w-max lg:w-72 lg:-right-28 top-full mt-4 invisible opacity-0 rounded-md bg-richblack-5 p-4 text-richblue-900 group-hover:visible group-hover:opacity-100 transition-all duration-200 '>
                                                        <ul className='text-lg'>
                                                            {catalogLinks.length > 0 ?
                                                                catalogLinks.map((e, i) => (
                                                                    <li key={i} className='hover:bg-richblack-50 rounded-md relative z-10'>
                                                                        <Link to={e.link} className='w-full inline-block p-3'>{e.title}</Link>
                                                                    </li>
                                                                )) :
                                                                <li className='flex w-full h-full items-center justify-center'>No Data</li>
                                                            }
                                                        </ul>

                                                        <div className='absolute h-6 w-6 rotate-45 rounded bg-richblack-5 -top-1 right-6 lg:right-[37%]'>
                                                        </div>

                                                    </div>
                                                </div>
                                            )
                                            :
                                            (
                                                <NavLink to={link?.path}>{link.title}</NavLink>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* LOGIN / SIGNUP / DASHBOARD */}
                <div className='flex items-center gap-3'>
                    {/* <AiOutlineSearch className='text-2xl'/> */}
                    {
                        user && user?.accountType !== "instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className='text-2xl' />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute flex items-center justify-center font-semibold rounded-full text-sm w-[20px] h-[20px] text-richblack-800 bg-yellow-50 -top-3 -right-3'>{totalItems}</span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md'>
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && (
                            <ProfileDropdown />
                        )
                    }

                </div>
            </div>
        </div>

    )
}

export default Navbar
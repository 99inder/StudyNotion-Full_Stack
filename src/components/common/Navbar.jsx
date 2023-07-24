import React, { useState } from 'react'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links"
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart, AiOutlineClose } from "react-icons/ai"
import ProfileDropdown from '../core/Auth/ProfileDropdown'
import { useEffect } from 'react'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { BsChevronDown } from 'react-icons/bs'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {

    const location = useLocation();

    const { token } = useSelector(state => state.auth);
    const { user } = useSelector(state => state.profile);
    const { totalItems } = useSelector(state => state.cart);

    const [catalogLinks, setCatalogLinks] = useState([]);

    const [loading, setLoading] = useState(false);

    const fetchSublinks = async () => {
        setLoading(true);
        try {
            const { data } = await apiConnector("GET", categories.CATEGORIES_API);

            let requiredData = data.allCategories.map(category => ({ title: category.name, link: `/catalog/${category.name.replace(" ", "-").toLowerCase()}` }));

            setCatalogLinks(requiredData);

        } catch (error) {
            console.log("Failed to fetch Catalog Data.")
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSublinks();
    }, [])


    // for small devices navbar
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='fixed lg:static w-screen z-[9999]'>
            <div className={`flex h-[3.5rem] items-center py-4 border-b-[1px] border-richblack-700 text-white ${(location.pathname === '/' || location.pathname === '/contact') ? "bg-richblack-900" : "bg-richblack-800"} transition-all duration-200`}>

                <div className='w-11/12 max-w-maxContent mx-auto grid grid-cols-2 lg:grid-cols-3 '>

                    {/* LOGO */}
                    <Link to="/" className='flex items-center'>
                        <img src={Logo} alt="Logo.svg" width={160} />
                    </Link>

                    {/* NAVIGATION */}
                    <nav className='hidden lg:flex items-center justify-center'>
                        <ul className='flex gap-x-10 text-richblack-25 justify-center items-center'>
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
                                                                {
                                                                    loading ?
                                                                        <li className='flex w-full h-full items-center justify-center'>Fetching...</li>
                                                                        :
                                                                        catalogLinks.length > 0 ?
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
                    <div className='hidden lg:flex items-center justify-end gap-3'>
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


                    <div className='lg:hidden flex justify-end gap-x-2'>
                        {
                            token !== null && (
                                <ProfileDropdown />
                            )
                        }

                        <button
                            type='button'
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='text-richblack-100 border-[1px] border-richblack-200 rounded-md w-[35px] h-[35px] p-1 flex items-center justify-center text-2xl'>
                            {
                                !isMenuOpen ? (<GiHamburgerMenu />) : (<AiOutlineClose />)
                            }
                        </button>

                    </div>

                </div>


                {/* NAVBAR FOR SMALL DEVICES */}
                <div className={`${!isMenuOpen ? "w-0 opacity-0" : "w-screen opacity-100"} fixed z-[100] right-0 top-[3.5rem] overflow-hidden h-[calc(100dvh-3.5rem)]  bg-opacity-10 backdrop-blur-sm lg:hidden transition-all duration-200`}>
                    <div className={`absolute right-0 w-1/2 h-full bg-richblack-800 transition-all duration-200`}>

                        <nav className='px-5 py-3'>
                            <ul className=' text-richblack-25 text-lg'>
                                {
                                    NavbarLinks.map((link, index) => (
                                        <li key={index} className='my-5'>
                                            {
                                                link.title === "Catalog"
                                                    ?
                                                    (
                                                        <div className='cursor-pointer relative group'>
                                                            <div className='flex items-center justify-between' onClick={() => setIsCatalogOpen(!isCatalogOpen)}>
                                                                <p>{link.title}</p>
                                                                <BsChevronDown className={`${isCatalogOpen ? "rotate-180" : ""}`} />
                                                            </div>

                                                            <div className={` transition-all duration-200 ${isCatalogOpen ? "h-fit opacity-100 " : "h-0 hidden opacity-0"}`}>
                                                                <ul className={`text-lg`}>
                                                                    {
                                                                        catalogLinks.length > 0 ?
                                                                            catalogLinks.map((e, i) => (
                                                                                <li key={i} className='rounded-md relative z-9'>
                                                                                    <Link to={e.link} className='w-full inline-block p-3'>{e.title}</Link>
                                                                                </li>
                                                                            )) :
                                                                            <li className='flex w-full h-full items-center justify-center'>No Data</li>
                                                                    }
                                                                </ul>
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
                        <div className='absolute bottom-[5%] w-full'>
                            <div className='flex items-center justify-center gap-3'>
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
                                        <Link to="/login" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                            <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md'>
                                                Log In
                                            </button>
                                        </Link>
                                    )
                                }
                                {
                                    token === null && (
                                        <Link to="/signup" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                            <button className='border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md'>
                                                Sign Up
                                            </button>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
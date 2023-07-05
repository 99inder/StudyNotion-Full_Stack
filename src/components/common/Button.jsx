import React from 'react'
import { Link } from 'react-router-dom'

const Button = ({ children, active, linkto }) => {
    return (
        <Link to={linkto}>
            <div className={`text-center text-sm px-6 py-3 rounded-md font-bold hover:scale-95 transition-all duration-200 ${active ? "bg-yellow-50 text-richblack-900" : "bg-richblack-800 text-richblack-5"}`}>
                {children}
            </div>
        </Link>
    )
}

export default Button
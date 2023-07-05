import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onclick}
            type={type}
            className={`text-center px-5 py-2 text-base font-medium rounded-md h-fit w-fit text-richblack-900 bg-yellow-50 ${customClasses}`}
        >
            {
                children ? (
                    <div className='flex items-center'>
                        {children}
                        <span>
                            {text}
                        </span>
                    </div>
                ) : (text)
            }
        </button>
    )
}

export default IconBtn

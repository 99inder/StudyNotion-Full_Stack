import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline = false,
    customClasses,
    innerClasses,
    type,
}) => {
    return (
        <span className={`${customClasses}`}>
            <button
                disabled={disabled}
                onClick={onclick}
                type={type}
                className={`text-center px-5 py-2 text-base font-mediu rounded-md h-fit w-fit text-richblack-900 bg-yellow-50`}
            >
                {
                    children ? (
                        <div className={`flex items-center ${innerClasses}`}>
                            {children}
                            <span>
                                {text}
                            </span>
                        </div>
                    ) : (text)
                }
            </button>
        </span>
    )
}

export default IconBtn

import React from 'react'

const HighlightText = ({ text }) => {
    return (
        <span className=' bg-gradient-to-br from-primary from-[#1FA2FF] to-[#A6FFCB] bg-clip-text text-transparent'>
            {text}
        </span>
    )
}

export default HighlightText
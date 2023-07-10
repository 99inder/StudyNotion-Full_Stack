import React from 'react'

const CourseUploadTips = () => {
    return (
        <div className='p-4 lg:p-6 h-fit text-richblack-5 bg-richblack-800 rounded-lg max-w-[384px] sticky top-[1.5625rem]'>
            <h2 className='mb-5 text-lg font-semibold leading-[1.625rem]'>⚡ Course Upload Tips</h2>
            <ul className='flex flex-col gap-3 list-disc px-4'>
                <li className='text-xs leading-5 font-medium'>Set the Course Price option or make it free.</li>
                <li className='text-xs leading-5 font-medium'>Standard size for the course thumbnail is 1024x576.</li>
                <li className='text-xs leading-5 font-medium'>Video section controls the course overview video.</li>
                <li className='text-xs leading-5 font-medium'>Course Builder is where you create & organize a course.</li>
                <li className='text-xs leading-5 font-medium'>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li className='text-xs leading-5 font-medium'>Information from the Additional Data section shows up on the course single page.</li>
                <li className='text-xs leading-5 font-medium'>Make Announcements to notify any important</li>
                <li className='text-xs leading-5 font-medium'>Notes to all enrolled students at once.</li>
            </ul>
        </div>
    )
}

export default CourseUploadTips
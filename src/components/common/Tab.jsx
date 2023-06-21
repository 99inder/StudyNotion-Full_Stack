import React from 'react'

const Tab = ({ tabData, field, setField }) => {
    return (
        <div className='flex max-w-fit bg-richblack-800 rounded-full shadow-sm' style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}>
            {
                tabData.map((tab) => {
                    return (
                        <div key={tab.id} className={`${field === tab.type ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200 hover:bg-richblack-700"} rounded-full transition-all duration-200 cursor-pointer hover:text-richblack-5 my-1 mx-1 py-2 px-7`} onClick={() => setField(tab.type)}>
                            {tab.tabName}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Tab
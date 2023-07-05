const ConfirmationModal = ({ modalData }) => {
    return (
        <div className="text-white fixed inset-0 grid place-items-center bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="border border-richblack-400 bg-richblack-800 p-6 rounded-lg">
                <div>
                    <p className="text-2xl font-semibold text-richblack-5">{modalData.text1}</p>
                    <p className="mt-3 mb-5 leading-6 text-richblack-200">{modalData.text2}</p>
                </div>
                <div className='flex items-center gap-x-4'>
                    <button className='text-semibold bg-yellow-50 text-lg rounded-md px-4 py-2 text-richblack-900' onClick={modalData.btn1Handler}>
                        {modalData.btn1Text}
                    </button>
                    <button className='text-semibold bg-richblack-200 text-lg rounded-md px-4 py-2 text-richblack-900' onClick={modalData.btn2Handler}>
                        {modalData.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
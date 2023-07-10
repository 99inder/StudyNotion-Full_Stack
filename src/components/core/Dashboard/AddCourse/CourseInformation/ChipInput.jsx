import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoClose } from 'react-icons/io5'

const ChipInput = ({
    // Props to be passed to the component
    label,
    name,
    placeholder,
    register,
    errors,
    setValue,
}) => {

    const { editCourse, course } = useSelector((state) => state.course)

    // Setting up state for managing chips array
    const [chips, setChips] = useState([]);

    useEffect(() => {
        if (editCourse) {
            // console.log(course)
            setChips(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(name, chips)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chips])

    // Function to handle user input when chips are added
    const handleKeyDown = (event) => {
        // Check if user presses "Enter" or ","
        if (event.key === 'Enter' || event.key === ',') {
            // Prevent the default behavior of the event
            event.preventDefault();
            // Get the input value and remove any leading/trailing spaces
            const chipValue = event.target.value.trim();
            // Check if the input value exists and is not already in the chips array
            if (chipValue && !chips.includes(chipValue)) {
                // Add the chip to the array and clear the input
                setChips(prev => [...prev, chipValue]);
                event.target.value = "";
            }
        }
    };

    // Function to handle deletion of a chip
    const handleDeleteChip = (index) => {
        let newChips = [...chips];
        // delete 1 chip at the received index
        newChips.splice(index, 1);
        setChips(newChips);
    }

    return (
        <div>
            <label htmlFor={name}
                className="text-richblack-5 text-sm leading-[1.375rem]">{label} <sup className="text-pink-200">*</sup></label>
            <input
                id={name}
                type="text"
                placeholder={placeholder}
                onKeyDown={handleKeyDown}
                className="w-full p-3 mt-[6px] bg-richblack-700 text-richblack-5 rounded-lg font-medium"
            />
            <div className="flex gap-4 flex-wrap mt-2">
                {
                    chips.map((chip, index) => (
                        <div key={index} className="flex items-center gap-1 bg-richblack-600 text-richblack-50 rounded-lg px-1 ">
                            {chip}
                            <span className="hover:text-yellow-50 transition-all duration-200" >
                                <IoClose onClick={() => handleDeleteChip(index)} />
                            </span>
                        </div>
                    ))
                }
            </div>
            {
                errors[name] && <span className="ml-2 text-xs tracking-wide text-pink-200">Tags are required</span>
            }
        </div >
    )
}

export default ChipInput
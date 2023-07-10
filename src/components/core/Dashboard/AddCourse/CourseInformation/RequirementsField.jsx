import { useEffect } from "react";
import { useState } from "react"
import { useSelector } from "react-redux";

const RequirementsField = ({ label, name, placeholder, register, setValue, errors }) => {

    const [requirement, setRequirement] = useState("");
    const [requirementsList, setRequirementsList] = useState([]);

    const { editCourse, course } = useSelector(state => state.course);

    useEffect(() => {
        if (editCourse) {
            setRequirementsList(course?.instructions)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(name, requirementsList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [requirementsList]);

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementsList(prev => ([...prev, requirement]));
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updatedRequirementList = [...requirementsList];
        updatedRequirementList.splice(index, 1);
        setRequirementsList(updatedRequirementList);
    }

    return (
        <div>
            <label htmlFor={name}
                className="text-richblack-5 text-sm leading-[1.375rem]">{label} <sup className="text-pink-200">*</sup></label>
            <input
                type="text"
                id={name}
                placeholder={placeholder}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className="w-full p-3 mt-[6px] bg-richblack-700 text-richblack-5 rounded-lg font-medium"
            />
            <div onClick={handleAddRequirement} className="font-semibold text-yellow-50 w-fit cursor-pointer mt-3">
                Add
            </div>

            {
                requirementsList.length > 0
                &&
                <ul className="mt-3">
                    {
                        requirementsList.map((item, index) => (
                            <li key={index} className="flex gap-3 mt-2">
                                <span>{item}</span>
                                <button
                                    onClick={() => handleRemoveRequirement(index)}
                                    className="text-richblack-800 bg-richblack-400 rounded-2xl text-sm px-[5px]"
                                >
                                    clear
                                </button>
                            </li>
                        ))
                    }

                </ul>
            }
            {
                errors[name] && <span className="ml-2 text-xs tracking-wide text-pink-200">Requirements / Instructions are required.</span>
            }

        </div>
    )
}

export default RequirementsField
import { useEffect } from "react";
import { useForm } from "react-hook-form"
import countryCodes from '../../../data/countrycode.json';
import { toast } from "react-hot-toast";

const ContactUsForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                message: "",
                contactNumber: null,
            });
        }
    }, [reset, isSubmitSuccessful])

    const submitContactForm = (data) => {
        toast.success("Query Submitted");
    }

    return (

        <form onSubmit={handleSubmit(submitContactForm)}>

            <div className="flex flex-col">
                <div className="flex flex-col lg:flex-row gap-5">
                    {/* FIRST NAME */}
                    <div className="flex flex-col gap-[0.375rem]">
                        <label htmlFor="firstName" className="text-sm leading-[1.375rem] font-normal text-richblack-5">First Name</label>
                        <input
                            className="p-3 rounded-lg bg-richblack-800 text-richblack-200 text-base font-medium"
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter first name"
                            {...register("firstName", { required: true })}
                        />
                        {
                            errors.firstName && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">Please enter your first name</span>
                            )
                        }
                    </div>

                    {/* LAST NAME */}
                    <div className="flex flex-col gap-[0.375rem]">
                        <label htmlFor="lastName" className="text-sm leading-[1.375rem] font-normal text-richblack-5">Last Name</label>
                        <input
                            className="p-3 rounded-lg bg-richblack-800 text-richblack-200 text-base font-medium"
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter last name"
                            {...register("lastName")}
                        />
                        {
                            errors.lastName && (
                                <span className="ml-2 text-xs tracking-wide text-pink-200">Please enter correct name</span>
                            )
                        }
                    </div>

                </div>

                {/* EMAIL ADDRESS */}
                <div className="flex flex-col gap-[0.375rem] mt-5">
                    <label htmlFor="email" className="text-sm leading-[1.375rem] font-normal text-richblack-5">Email Address</label>
                    <input
                        className="p-3 rounded-lg bg-richblack-800 text-richblack-200 text-base font-medium"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email address"
                        {...register("email", { required: true })}
                    />
                    {
                        errors.email && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please enter your email address</span>
                        )
                    }
                </div>

                {/* PHONE NUMBER */}
                <div className="flex flex-col gap-[0.375rem] mt-5">
                    <label htmlFor="contactNumber" className="text-sm leading-[1.375rem] font-normal text-richblack-5">Phone Number</label>

                    <div className="flex gap-5 text-richblack-200">

                        <select name="countryCode"
                            {...register("countryCode", { required: true })}
                            className="rounded-lg min-w-[3.25rem] max-w-[82px] p-3 bg-richblack-800 text-richblack-200 text-base font-medium"
                        >
                            {
                                countryCodes.map((e, idx) => (
                                    <option key={idx} value={e.code}>{`${e.code} - ${e.country}`}</option>
                                ))
                            }
                        </select>

                        <input type="number"
                            id="contactNumber"
                            name="contactNumber"
                            placeholder="12345 67890"
                            {...register("contactNumber", {
                                required: true,
                                maxLength: { value: 10, message: "Invalid Phone Number" },
                                minLength: { value: 8, message: "Invalid Phone Number" }
                            })}
                            className="flex-[1] p-3 rounded-lg bg-richblack-800 text-richblack-200 text-base font-medium"
                        />
                    </div>
                    {
                        errors.contactNumber && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">{errors.contactNumber.message}</span>
                        )
                    }
                </div>

                {/* MESSAGE AREA */}
                <div className="flex flex-col gap-[0.375rem] mt-9">

                    <label htmlFor="message" className="text-sm leading-[1.375rem] font-normal text-richblack-5">Message</label>
                    <textarea
                        className="p-3 rounded-lg bg-richblack-800 text-base font-medium text-richblack-200"
                        name="message"
                        id="message"
                        cols="30"
                        rows="5"
                        placeholder="Enter email address"
                        {...register("message", { required: true, minLength: 10 })}
                    >
                    </textarea>
                    {
                        errors.message && (
                            <span className="ml-2 text-xs tracking-wide text-pink-200">Please enter your message</span>
                        )
                    }
                </div>

                <button type="submit"
                    className="bg-yellow-50 rounded-md text-richblack-900 py-3 mt-9 text-base font-medium"
                >
                    Send Message
                </button>
            </div>
        </form>
    )
}

export default ContactUsForm
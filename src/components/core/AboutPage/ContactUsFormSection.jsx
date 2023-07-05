import ContactUsForm from "../../common/ContactPage/ContactUsForm";

const ContactUsFormSection = () => {

    return (
        <div className="flex flex-col items-center justify-center text-white pt-[5.625rem]">

            <div className="text-richblack-5 text-center">
                <h3 className="text-4xl leading-[2.75rem] -tracking-[0.045rem] font-semibold mb-3">Get in Touch</h3>
                <p className="text-richblack-300 text-base font-medium mb-8">We’d love to here for you, Please fill out this form.</p>
            </div>

            {/* FORM */}

            <div className="lg:p-8">
                <ContactUsForm />
            </div>
        </div>
    )
}

export default ContactUsFormSection
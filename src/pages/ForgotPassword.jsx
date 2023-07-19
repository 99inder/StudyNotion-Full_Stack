import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Spinner from '../components/common/Spinner';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);

    const { loading } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setIsEmailSent));
    }

    return (
        <div className='flex flex-col text-white justify-center items-center h-[calc(100dvh-3.5rem)]'>
            {
                loading
                    ?
                    <Spinner />
                    :
                    <div className='flex flex-col max-w-[31.75rem] p-8'>
                        <h1 className='text-richblack-5 text-3xl font-semibold leading-[2.375rem]'>
                            {
                                !isEmailSent ? "Reset your password" : "Check your email"
                            }
                        </h1>
                        <p className='text-richblack-100 text-lg leading-[1.625rem] mt-3'>
                            {
                                !isEmailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to
                                        ${email}`
                            }
                        </p>

                        {
                            !isEmailSent
                            &&
                            <form onSubmit={handleOnSubmit} className='mt-9'>
                                <label>
                                    <p className='text-richblack-5 text-sm leading-[1.375rem]'>Email Address <sup className=' text-pink-200'>*</sup></p>
                                    <input className='font-medium p-3 w-full rounded-md bg-richblack-700 mt-2' placeholder='Enter email address' required name='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </label>
                                <button type='submit' className='bg-yellow-50 w-full rounded-md text-richblack-900 font-semibold mt-9 py-3'>
                                    Reset Password
                                </button>
                            </form>
                        }

                        {
                            isEmailSent &&
                            <button className='bg-yellow-50 rounded-md text-richblack-900 font-semibold mt-9 py-3'>
                                Resend Email
                            </button>
                        }

                        <Link to={'/login'} className='flex items-center gap-x-2 font-medium text-richblack-5 text-base p-3 mt-3'>
                            <AiOutlineArrowLeft /> Back to login
                        </Link>
                    </div>
            }
        </div>
    )
}

export default ForgotPassword
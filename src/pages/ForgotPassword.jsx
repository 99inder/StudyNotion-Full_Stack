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
        <div className='flex flex-col text-white justify-center items-center h-screen'>
            {
                loading
                    ?
                    <Spinner />
                    :
                    <div className='flex flex-col max-w-[31.75rem]'>
                        <h1>
                            {
                                !isEmailSent ? "Reset your password" : "Check your email"
                            }
                        </h1>
                        <p>
                            {
                                !isEmailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to
                                        ${email}`
                            }
                        </p>

                        {
                            !isEmailSent
                            &&
                            <form onSubmit={handleOnSubmit}>
                                <label>
                                    <p>Email Address <sup className=' text-pink-200'>*</sup></p>
                                    <input className='font-medium p-3 w-full rounded-md bg-richblack-700 mt-2' placeholder='Enter email address' required name='email' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </label>
                                <button type='submit' className='bg-yellow-50 rounded-md text-richblack-900 font-semibold mt-9 py-3'>
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

                        <Link to={'/login'}>
                            <AiOutlineArrowLeft /> Back to login
                        </Link>
                    </div>
            }
        </div>
    )
}

export default ForgotPassword
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import OTPInput from 'react-otp-input';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useEffect } from 'react';

const VerifyEmail = () => {

    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, signupData } = useSelector(state => state.auth);

    useEffect(() => {
        if (!signupData)
            navigate('/signup');
        // eslint-disable-next-line
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData;

        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));
    }

    return (
        <div className='mx-auto my-auto'>
            {
                loading
                    ?
                    <Spinner />
                    :
                    <div className='max-w-[31.75rem] text-white flex flex-col p-8 gap-6'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-richblack-5 text-3xl leading font-semibold leading-[2.375rem]'>Verify email</h1>
                            <p className=' text-lg leading-[1.625rem] text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
                        </div>

                        <div className='flex flex-col gap-6'>
                            <form onSubmit={handleOnSubmit}>
                                <OTPInput
                                    value={otp}
                                    onChange={setOtp}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => <input {...props} />}
                                />

                                <button type='submit' className='bg-yellow-50 text-richblack-900 text-base font-medium rounded-lg self-stretch p-3 w-full'>
                                    Verify email
                                </button>
                            </form>
                        </div>

                        <div className='flex justify-between flex-wrap'>

                            <Link to='/login' className='flex gap-2 items-center justify-start p-3 font-medium text-base'>
                                <AiOutlineArrowLeft /> Back to login
                            </Link>

                            <div onClick={() => dispatch(sendOtp(signupData.email, navigate))} className='flex gap-2 items-center justify-end text-blue-100 p-3 font-medium cursor-pointer'>
                                <BsArrowCounterclockwise /> Resend it
                            </div>

                        </div>


                    </div>
            }
        </div>
    )
}

export default VerifyEmail;
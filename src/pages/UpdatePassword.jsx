import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Spinner from '../components/common/Spinner';
import { resetPassword } from '../services/operations/authAPI';

const UpdatePassword = () => {

    const { loading } = useSelector(state => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    const handleOnChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        const { password, confirmPassword } = formData;
        dispatch(resetPassword(password, confirmPassword, token));
    }

    return (
        <div className='mx-auto my-auto'>
            {
                loading
                    ?
                    <Spinner />
                    :
                    <div className=' text-richblack-5 flex flex-col gap-6 items-start p-8 max-w-[31.75rem] font-inter'>

                        <div className='flex flex-col gap-3'>
                            <h1 className='text-richblack-5 text-3xl leading-[2.375rem] font-semibold'>Choose a new password</h1>
                            <p className='text-richblack-100 text-lg leading-[1.625rem]'>Almost done. Enter your new password and you're all set.</p>
                        </div>

                        <form onSubmit={handleOnSubmit} className='flex flex-col items-start gap-5 self-stretch'>
                            <label className='flex flex-col gap-[0.125rem] self-stretch relative'>
                                <p className=' text-sm leading-[1.375rem]'>New password <span className=' text-pink-200'>*</span></p>
                                <input
                                    required
                                    placeholder='Enter password'
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    name='password'
                                    value={formData.password}
                                    onChange={handleOnChange}
                                    className=' p-3 pr-[2rem] bg-richblack-800 rounded-lg text-base font-medium text-richblack-200 self-stretch'
                                />
                                <span className='absolute right-2 top-[2.3rem] z-[10] cursor-pointer text-2xl bg-richblack-800' onClick={() => setShowPassword(prev => !prev)}>
                                    {
                                        showPassword ? <AiOutlineEyeInvisible fill='#AFB2BF' /> : <AiOutlineEye fill='#AFB2BF' />
                                    }
                                </span>
                            </label>
                            <label className='flex flex-col gap-[0.125rem] self-stretch relative'>
                                <p className=' text-sm leading-[1.375rem]'>Confirm password <span className=' text-pink-200'>*</span></p>
                                <input
                                    required
                                    placeholder='Enter confirm password'
                                    type={`${showConfirmPassword ? 'text' : 'password'}`}
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleOnChange}
                                    className=' p-3 pr[2.1rem] bg-richblack-800 rounded-lg text-base font-medium text-richblack-200 self-stretch'
                                />
                                <span className='absolute right-2 top-[2.3rem] z-[10] cursor-pointer text-2xl bg-richblack-800' onClick={() => setShowConfirmPassword(prev => !prev)}>
                                    {
                                        showConfirmPassword ? <AiOutlineEyeInvisible fill='#AFB2BF' /> : <AiOutlineEye fill='#AFB2BF' />
                                    }
                                </span>
                            </label>
                            <div className=' mt-1'>
                                VALIDATIONS
                            </div>
                            <button type='submit' className='mt-1 bg-yellow-50 text-richblack-900 text-base font-medium rounded-lg self-stretch p-3'>
                                Reset Password
                            </button>
                        </form>

                        <Link to={'/login'} className='-mt-3 flex gap-2 items-center justify-start p-3 font-medium text-base'>
                            <AiOutlineArrowLeft /> Back to login
                        </Link>

                    </div>
            }


        </div>
    )
}

export default UpdatePassword
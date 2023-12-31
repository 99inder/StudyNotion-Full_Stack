import { useState } from 'react';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import Tab from '../../common/Tab';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from 'react-hot-toast';
import { setSignupData } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { sendOtp } from '../../../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tabData = [
    {
      id: 1,
      tabName: 'Student',
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: 'Instructor',
      type: ACCOUNT_TYPE.INSTRUCTOR,
    }
  ]

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const changeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to redux store state
    // To be used after otp verification
    dispatch(setSignupData(signupData));

    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate));

    //reset state
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

    setAccountType(ACCOUNT_TYPE.STUDENT);
  }


  return (
    <form onSubmit={handleSubmit} className='text-white mt-9 flex flex-col gap-5 font-inter'>

      <Tab tabData={tabData} field={accountType} setField={setAccountType} />

      {/* First and Last Name */}
      <div className='flex gap-4 wrap'>
        <label className='text-sm'>First Name <sup className='text-pink-200'>*</sup>
          <input className='font-medium p-3 w-full rounded-md bg-richblack-700 mt-2' type='text' placeholder='Enter first name' name="firstName" value={formData.firstName} onChange={changeHandler} />
        </label>
        <label className='text-sm'>Last Name <sup className='text-pink-200'>*</sup>
          <input className='font-medium p-3 w-full rounded-md bg-richblack-700 mt-2' type='text' placeholder='Enter last name' name="lastName" value={formData.lastName} onChange={changeHandler} />
        </label>
      </div>

      {/* Email */}
      <label className='text-sm'>Email Address <sup className='text-pink-200'>*</sup>
        <input className='font-medium p-3 w-full rounded-md bg-richblack-700 mt-2' type='email' placeholder='Enter email address' name="email" value={formData.email} onChange={changeHandler} />
      </label>

      {/* Password */}
      <div className='flex gap-4'>
        <label className='text-sm relative'>Password <sup className='text-pink-200'>*</sup>
          <input className='font-medium p-3 w-full rounded-md bg-richblack-700 mt-2' type={`${showPassword ? 'text' : 'password'}`} placeholder='Enter password' name="password" value={formData.password} onChange={changeHandler} />
          <span className='absolute right-2 top-[2.3rem] z-[10] cursor-pointer text-2xl bg-richblack-700' onClick={() => setShowPassword(prev => !prev)}>
            {
              showPassword ? <AiOutlineEyeInvisible fill='#AFB2BF' /> : <AiOutlineEye fill='#AFB2BF' />
            }
          </span>
        </label>

        <label className='text-sm relative'>Confirm Password <sup className='text-pink-200'>*</sup>
          <input className='font-medium p-3 w-full rounded-md bg-richblack-700 mt-2' type={`${showConfirmPassword ? 'text' : 'password'}`} placeholder='Enter password' name="confirmPassword" value={formData.confirmPassword} onChange={changeHandler} />
          <span className='absolute right-2 top-[2.3rem] z-[10] cursor-pointer text-2xl bg-richblack-700' onClick={() => setShowConfirmPassword(prev => !prev)}>
            {
              showConfirmPassword ? <AiOutlineEyeInvisible fill='#AFB2BF' /> : <AiOutlineEye fill='#AFB2BF' />
            }
          </span>
        </label>
      </div>

      <button type='submit' className=' bg-yellow-50 rounded-md text-richblack-900 font-semibold mt-9 py-3'>
        Create Account
      </button>
    </form>
  )
}

export default SignupForm
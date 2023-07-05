import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../../services/operations/authAPI';

const LoginForm = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const changeHandler = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(formData.email, formData.password, navigate));
  }

  return (
    <form onSubmit={handleSubmit} className='text-white mt-9 flex flex-col gap-5 font-inter'>
      <label className='text-sm'>Email Address <sup className='text-pink-200'>*</sup>
        <input required className='block font-medium p-3 w-full rounded-md bg-richblack-700 mt-2' type='email' placeholder='Enter Email Address' name="email" value={formData.email} onChange={changeHandler} />
      </label>
      <label className='text-sm relative'>Password <sup className='text-pink-200'>*</sup>
        <input required className='block font-medium p-3 w-full rounded-md bg-richblack-700 mt-2' type={`${showPassword ? 'text' : 'password'}`} placeholder='Enter Password Address' name="password" value={formData.password} onChange={changeHandler} />
        <span className='absolute right-2 top-[2.3rem] z-[10] cursor-pointer text-2xl bg-richblack-700' onClick={() => setShowPassword(prev => !prev)}>
          {
            showPassword ? <AiOutlineEyeInvisible fill='#AFB2BF' /> : <AiOutlineEye fill='#AFB2BF' />
          }
        </span>
      </label>
      <Link to="/forgot-password" className=' text-xs -mt-3 font-normal text-blue-100 text-right'>Forgot Password</Link>

      <button type='submit' className=' bg-yellow-50 rounded-md text-richblack-900 font-semibold mt-9 py-3'>
        Sign In
      </button>
    </form>
  )
}

export default LoginForm
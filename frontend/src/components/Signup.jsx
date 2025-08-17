import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'

function Signup() {

   const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()

      const onSubmit = async (data) => {
        const userInfo = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        }
          await axios
          .post('http://localhost:4000/user/signup', userInfo)
          .then((res)=> {
            if (res.data) {
            toast.success('User registered successfully');
            navigate(from, { replace: true });
        }
        console.log("res.data =", res.data);

        localStorage.setItem("User", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          console.log("Error during signup:", err);
          toast.error("An error occurred. Please try again. " + err.response.data.message);
        }

      });
      }

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='relative w-80 p-6 bg-white dark:bg-neutral rounded-lg shadow-2xl'>

          {/* ❌ Cross Button */}
          <Link
            to="/"
            className="absolute top-2 right-2 text-gray-500 hover:text-pink-600 text-xl font-bold"
            title="Close"
          >
            ×
          </Link>

          <h2 className='text-center text-xl font-semibold mb-4 text-gray-800 dark:text-white'>Sign Up</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div className='mb-4'>
              <label className='block mb-1 text-sm text-gray-700 dark:text-gray-300'>Name</label>
              <input
                type='text'
                placeholder='Enter Your Name'
                className='w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-pink-500'
                {...register("fullName", { required: true })}
              />
              <br />
              {errors.fulName && <span className='text-sm text-red-600'>This field is required</span>}
            </div>

            {/* Email Field */}
            <div className='mb-4'>
              <label className='block mb-1 text-sm text-gray-700 dark:text-gray-300'>Email</label>
              <input
                type='email'
                placeholder='Enter Your Email'
                className='w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-pink-500'
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && <span className='text-sm text-red-600'>This field is required</span>}
            </div>

            {/* Password Field */}
            <div className='mb-4'>
              <label className='block mb-1 text-sm text-gray-700 dark:text-gray-300'>Password</label>
              <input
                type='password'
                placeholder='Enter Your Password'
                className='w-full px-3 py-2 border rounded outline-none focus:ring-2 focus:ring-pink-500'
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && <span className='text-sm text-red-600'>This field is required</span>}
            </div>

            {/* Submit Button */}
            <button className='w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-500 hover:scale-105 transition-transform'>
              Sign Up
            </button>
          </form>

          {/* Log In Link */}
          <p className='text-center mt-4 text-sm text-gray-600 dark:text-gray-300'>
            Already have an account?{' '}
            <button to="/" className='text-pink-600 hover:underline'
              onClick={() => document.getElementById('my_modal_1').showModal()}>
              Log In
            </button>
          </p>
          <Login />
        </div>
      </div>
    </>
  )
}

export default Signup

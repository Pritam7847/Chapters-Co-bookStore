import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios'
import toast from 'react-hot-toast'

function Login() {
  const navigate = useNavigate()

  const handleClose = () => {
    document.getElementById('my_modal_1').close() // Close the modal
    navigate('/') // Redirect to home
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    }
    await axios
      .post('http://localhost:4000/user/login', userInfo)
      .then((res) => {
        if (res.data) {
          toast.success('Login successful');
          document.getElementById('my_modal_1').close(); // Close the modal
          setTimeout(() => {
            window.location.reload(); // Reload the page to reflect changes
          }, 2000);
          localStorage.setItem("User", JSON.stringify(res.data.user));
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          console.log("Error during login:", err);
          toast.error("An error occurred. Please try again. " + err.response.data.message);
          setTimeout(() => { }, 2000);
        }
      });
  }

  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Login!</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Email Field */}
            <div className='space-y-4 mt-4'>
              <span>Email</span>
              <br />
              <input
                type="email"
                placeholder='Enter Your Email'
                className='w-80 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200'
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && <span className='text-sm text-red-600'>This field is required</span>}
            </div>

            {/* Password Field */}
            <div className='space-y-4 mt-4'>
              <span>Password</span>
              <br />
              <input
                type="password"
                placeholder='Enter Your Password'
                className='w-80 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200'
                {...register("password", { required: true })}
              />
              <br />
              {errors.password && <span className='text-sm text-red-600'>This field is required</span>}
            </div>

            {/* Login Button + Link */}
            <div className='flex flex-col items-center mt-4'>
              <button className='bg-pink-600 text-white mt-5 px-4 py-2 rounded-md hover:bg-pink-500 hover:scale-105 transition-transform duration-200'>
                Login
              </button>

              <p className='mt-2'>
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-700">Sign Up</Link>
              </p>
            </div>
          </form>

          {/* Close Button with Redirect */}
          <div className="modal-action">
            <button onClick={handleClose} className="btn">
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Login

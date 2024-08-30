import React, { useContext, useState } from 'react'
import style from './ResetPassword.module.css'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import axios from 'axios';
import { useFormik } from 'formik';
import { UserContext } from '../../Context/UserContext';

export default function ResetPassword() {


  let validationSchema = Yup.object().shape({
    email: Yup.string().email('email invalid').required('email is required'),
  })

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null);
  let {setUserToken} = useContext(UserContext)
  let navigate = useNavigate()

  async function handleResetPassword(resetUserPassword) {
    try {
      setLoading(true)
      let { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', resetUserPassword)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')
    } catch (error) {
      console.log(error);
      setLoading(false)
      setApiError(error.response.data.message)
    }
  }

  let formik = useFormik({
    initialValues: {
      email: '',
      newPassword: ''
    }, validationSchema,
    onSubmit: handleResetPassword
  })


  return (<>

    <div className="container mx-auto p-5 w-1/2 ">
      <h1 className='py-6 text-3xl font-semibold'>Reset your account password</h1>
      <form onSubmit={formik.handleSubmit}>
        {apiError && <div className="p-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {apiError}
        </div>}
        <div className="relative z-0 w-full mb-4 group">
          <input type="email" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email:</label>
        </div>
        {formik.errors.email && formik.touched.email && <div className="p-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.email}
        </div>}
        <div className="relative z-0 w-full mb-4 group">
          <input type="password" name="newPassword" value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your password:</label>
        </div>
        {formik.errors.newPassword && formik.touched.newPassword && <div className="p-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.newPassword}
        </div>}
        {loading ? <button type="button" className="text-white  bg-emerald-500 hover:bg-emerald-800 focus:ring-2 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"> <i className='fas fa-spinner fa-spin-pulse'></i></button> : <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Reset Password</button>}
      </form>
    </div>
  </>)
}


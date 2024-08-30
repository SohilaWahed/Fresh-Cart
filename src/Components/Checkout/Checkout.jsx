import React, { useContext, useState } from 'react'
import style from './Checkout.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { date } from 'yup';
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';

export default function Checkout() {

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null);
  let { cart } = useContext(CartContext)

  async function handleCheckout(userData) {
    try {
      setLoading(true)
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.data._id}?url=http://localhost:5173`, {
        shippingAddress: userData
      }, {
        headers: { token: localStorage.getItem('userToken') }
      })
      console.log(data.session.url);
      window.location.href = data.session.url
    } catch (error) {
      console.log(error);
      setLoading(false)
      setApiError(error.response.data.message)
    }
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    },
    onSubmit: handleCheckout
  })


  return <>

    <div className="mx-auto w-1/2 ">
      <h1 className='md:mt-20 text-3xl  font-semibold'>Checkout</h1>
      <form onSubmit={formik.handleSubmit} className='py-4'>
        {apiError && <div className="p-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {apiError}
        </div>}
        <div className="relative z-0 w-full mb-4 group">
          <input type="text" name="details" value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your details:</label>
        </div>
        {formik.errors.details && formik.touched.details && <div className="p-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.details}
        </div>}
        <div className="relative z-0 w-full mb-4 group">
          <input type="phone" name="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone:</label>
        </div>
        {formik.errors.phone && formik.touched.phone && <div className="p-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.phone}
        </div>}
        <div className="relative z-0 w-full mb-4 group">
          <input type="text" name="city" value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your city:</label>
        </div>
        {formik.errors.city && formik.touched.city && <div className="p-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.city}
        </div>}
        {loading ? <button type="button" className="text-white text-xl  bg-emerald-500 hover:bg-emerald-800 focus:ring-2 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg w-full sm:w-auto px-3 py-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"> <i className='fas fa-spinner fa-spin-pulse'></i></button> : <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4
         focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Checkout</button>}
      </form>

    </div>

  </>
}

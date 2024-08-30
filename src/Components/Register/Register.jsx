import { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../../Context/UserContext.jsx";

export default function Register() {

  let { setUserToken } = useContext(UserContext)

  // function handleValidate(userData) {

  //   // when make validate by hand use validate:NameFn in formik before submit 

  //   let errors = {}

  //   if (!userData.name) {
  //     errors.name = 'name is required'
  //   } else if (!/^[A-Z][a-z]{8}$/.test(userData.name)) {
  //     errors.name = 'name must be start with capital letter ex: Sohila'
  //   }

  //   if (!userData.email) {
  //     errors.email = 'email is required'
  //   } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
  //     errors.email = 'email invalid'
  //   }

  //   if (!userData.password) {
  //     errors.password = 'password is required'
  //   } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(userData.password)) {
  //     errors.password = 'password invalid'
  //   }


  //   if (!userData.rePassword) {
  //     errors.rePassword = 'rePassword is required'
  //   } else if (!userData.password === userData.rePassword) {
  //     errors.rePassword = 'rePassword not matched with password'
  //   }


  //   if (!userData.phone) {
  //     errors.phone = 'phone is required'
  //   } else if (!/^(002)?01[0125][0-9]{8}$/.test(userData.phone)) {
  //     errors.phone = 'Invalid Egyptian Phone Number'
  //   }

  //   return errors

  // }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'minmum is 3 letters').max(10, 'maxmum is 10 letters').required('name is required'),
    email: Yup.string().email('email invalid').required('email is required'),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'password invalid').required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], `password and rePassword don't matched`).required('rePassword is required'),
    phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}$/, 'Invalid Egyptian Phone Number').required('phone is required')
  })


  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  let navigate = useNavigate()

  async function handleRegister(userData) {
    try {
      setLoading(true)
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')
    } catch (err) {
      setLoading(false)
      setApiError(err.response.data.message)
    }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema, // when key same value (validationSchema:validationSchema) use key
    onSubmit: handleRegister,
  })

  return <>
    
    <div className="w-1/2 mx-auto">
    <h1 className='md:mt-20 text-3xl  font-semibold'>Register Now</h1>
      <form onSubmit={formik.handleSubmit} className='py-4'>
        {apiError && <div className="p-2 mb-5 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {apiError}
        </div>}

        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name:</label>
        </div>
        {formik.errors.name && formik.touched.name && <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.name}
        </div>}
        <div className="relative z-0 w-full mb-5 group">
          <input type="email" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email:</label>
        </div>
        {formik.errors.email && formik.touched.email && <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.email}
        </div>}
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your password:</label>
        </div>
        {formik.errors.password && formik.touched.password && <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.password}
        </div>}
        <div className="relative z-0 w-full mb-5 group">
          <input type="password" name="rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Repassword</label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.rePassword}
        </div>}
        <div className="relative z-0 w-full mb-5 group">
          <input type="text" name="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone</label>
        </div>
        {formik.errors.phone && formik.touched.phone && <div className="p-2 mb-2 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
          {formik.errors.phone}
        </div>}

        {loading ? <button type="button" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-2 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-2 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"> <i className='fas fa-spinner fa-spin-pulse'></i></button> : <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800">Submit</button>}

      </form>
    </div>

  </>
}

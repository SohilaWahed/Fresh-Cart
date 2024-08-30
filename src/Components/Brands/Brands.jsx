import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import Loading from '../Loading/Loading'
import axios from 'axios'

export default function Brands() {

  const [loading, setLoading] = useState(false)
  const [brandDetails, setBrandDetails] = useState({})

  const [brands, setBrands] = useState([])
  async function getAllBrands() {
    try {
      setLoading(true)
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      setBrands(data.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllBrands()
  }, [])

  return <>
    <h1 className="text-5xl md:mt-20 text-center">All Brands</h1>
    {loading ?
      <div className='flex justify-center items-center my-12'>
        <Loading />
      </div> : <>
        <div className='grid gap-8 md:grid-cols-3 lg:grid-cols-4 mt-8'>
          {brands.map((brand) => <>
            <div key={brand._id} className="group transition-all duration-500 hover:cursor-pointer border-[1px] border-gray-300 rounded-md hover:shadow-md hover:shadow-emerald-300" onClick={() => setBrandDetails(brand)}>
              <div className="image">
                <img src={brand.image} alt="" className='w-full h-[300px]' />
              </div>
              <h3 className='text-emerald-600 text-xl font-semibold text-center my-4'>{brand.name}</h3>
            </div>
          </>)}
        </div>
        {console.log(Object.keys(brandDetails).length)}
        {Object.keys(brandDetails).length ? <div className='fixed z-50 top-0 left-0 right-0 bottom-0 bg-[rgba(26,25,25,0.4)] flex justify-center items-start' onClick={()=>setBrandDetails({})} >
          <div className='bg-white mt-20 text-end rounded w-1/2' onClick={(e)=>{e.preventDefault(); e.stopPropagation();}}>
            <i className='fa-solid fa-xmark text-3xl block text-gray-500 m-4 hover:text-emerald-600 cursor-pointer' onClick={()=>setBrandDetails({})}></i>
            <div className="flex flex-col md:flex-row justify-center items-center py-4 border-y-[1px] border-y-gray-400">
              <div className="title text-center w-1/2">
                <h2 className='text-5xl text-emerald-600'>{brandDetails.name}</h2>
                <h3 className='text-2xl py-2'>{brandDetails.slug}</h3>
              </div>
              <div className="image w-1/2">
                <img src={brandDetails.image} alt="brand-image" />
              </div>
            </div>
            <button className='bg-emerald-600 text-white p-4 m-4 rounded-md' onClick={()=>setBrandDetails({})}>Close</button>
          </div>
        </div> : ''}
      </>
    }
  </>
}

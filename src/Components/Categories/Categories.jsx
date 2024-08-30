import React, { useContext, useEffect, useState } from 'react'
import style from './Categories.module.css'
import Loading from '../Loading/Loading'
import axios from 'axios'
import { ProductsContext } from '../../Context/ProductsContext'

export default function Categories() {

  const {categories} = useContext(ProductsContext)
  const [subLoading, setSubLoading] = useState(false)
  const [appear, setAppear] = useState(false)
  
  const [subcategories, setSubcategories] = useState([])
  async function getSubcategories(categoryId) {
    try {
      setSubLoading(true)
      setAppear(true)
      scrollToSection('subSection');
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`)
      setSubcategories(data.data)
      setSubLoading(false)
    } catch (error) {
      console.log(error)
      setSubLoading(false)
    }
  }

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return <>
    <h1 className="text-5xl md:mt-20 text-center">All Categories</h1>

    {!categories.length ?
      <div className='flex justify-center items-center my-12'>
        <Loading />
      </div> : <div className='grid gap-8 md:grid-cols-3 mt-8'>
        {categories.map((category) => <div key={category._id} className="group transition-all duration-500 hover:cursor-pointer border-[1px] border-gray-300 rounded-md hover:shadow-md hover:shadow-emerald-300" onClick={() => getSubcategories(category._id)}>
          <div className="image">
            <img src={category.image} alt="" className='w-full h-[300px]' />
          </div>
          <h3 className='text-emerald-600 text-xl font-semibold text-center my-4'>{category.name}</h3>
        </div>)}
      </div>
    }

    {subLoading ? <div className='flex justify-center items-center my-12'>
      <Loading />
    </div> : <> {appear ? <div id='subSection'>
      <h1 className="text-5xl md:mt-20 text-center">SubCategories</h1>
      {subcategories.length ? <div className='grid gap-8 md:grid-cols-3  mt-8'>
        {subcategories.map((sub) => <div key={sub._id} className="group transition-all duration-500 hover:cursor-pointer border-[1px] border-gray-300 rounded-md hover:shadow-md hover:shadow-emerald-300">
          <h3 className='text-emerald-600 text-xl font-semibold text-center py-4'>{sub.name}</h3>
        </div>)}
      </div> :
        <h3 className='text-center text-2xl my-6'>No Subcategories for this category</h3>
      }
    </div> : ''}</>

    }
  </>
}

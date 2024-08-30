import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import RecentProducts from '../RecentProducts/RecentProducts'
import { ProductsContext } from '../../Context/ProductsContext'

export default function Products() {

  const { products } = useContext(ProductsContext)
  const [mainList, setMainList] = useState([])

  function search(value) {
    value === ""
      ? setMainList(products)
      : setMainList(products.filter(item =>
        item.title.toLowerCase().includes(value.toLowerCase())
      ))
  }

  useEffect(() => {
    setMainList(products)
  }, [products])
  
  return <>

    <div className="flex justify-center md:mt-20">
      <input type="text" onInput={(e) => search(e.target.value)} className='p-2 mb-6 w-2/3 block border-[1px] border-slate-300 text-black rounded-md focus:outline-none' placeholder='Search...' />
    </div>
    <div className='grid gap-8 md:grid-cols-3 lg:grid-cols-5'>
      {mainList.map((product, index) => <RecentProducts key={index} product={product} />)}
    </div>

  </>
}

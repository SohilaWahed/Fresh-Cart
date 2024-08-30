import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext.jsx';
import { ProductsContext } from '../../Context/ProductsContext.jsx';
import toast from 'react-hot-toast';


export default function RecentProducts({ product }) {

  let { addToCart } = useContext(CartContext)
  let { addToWishList, removeFromWishList } = useContext(ProductsContext)
  const [favourite, setfavourite] = useState(false)

  return <>
    <div className="p-2 py-6 group transition-all duration-500 hover:cursor-pointer hover:border-[1px] hover:rounded-md hover:shadow-md hover:shadow-emerald-300">
      <div>
        <Link to={`./ProductDetails/${product.id}`}>
          <img src={product.imageCover} className='w-full' alt={product.title} />
          <div className='flex justify-between'>
            <div>
              <h2 className='text-sm text-emerald-600'>{product.category.name}</h2>
              <h2 className='font-medium'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
            </div>
            <div className='flex justify-end items-center pe-4'>
              {favourite ? <i className="fa-solid fa-heart text-2xl text-red-600" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setfavourite(false)
                removeFromWishList(product.id)
                toast.success('it has been successfully removed', { position: 'top-center', style: { backgroundColor: '#22c55e' } });
              }} ></i> : <i className="fa-solid fa-heart text-2xl text-green-600" onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setfavourite(true)
                addToWishList(product.id)
                toast.success('it has been successfully added',{ position: 'top-center', style: { backgroundColor: '#22c55e' } });
              }} ></i>}
            </div>
          </div>
          <div className='flex justify-between my-2'>
            <h3>{product.price} EGP</h3>
            <h3><i className='fas fa-star text-amber-400'></i> {product.ratingsAverage}</h3>
          </div>
        </Link>
        <button onClick={() => addToCart(product.id)} className='w-full bg-green-600 text-white rounded py-1 translate-y-[100%] opacity-0 duration-[.25s] group-hover:translate-y-0  group-hover:opacity-100'>Add To Cart</button>
      </div>
    </div>
  </>
}

import React, { useContext, useState } from 'react'
import style from './WishList.module.css'
import { CartContext } from '../../Context/CartContext'
import { ProductsContext } from '../../Context/ProductsContext'
import Loading from '../Loading/Loading'
import { useEffect } from 'react'
import axios from 'axios'

export default function WishList({ wishListProduct }) {

  let { addToCart } = useContext(CartContext)
  let { wishList, removeFromWishList, } = useContext(ProductsContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (wishList.length) {
      setLoading(false)
    }
  }, [wishList])

  return <>
    <h1 className="text-5xl md:mt-20 text-center">My Wish List</h1>
    {loading ?
      <div className='flex justify-center items-center my-12'>
        <Loading />
      </div> :
      <div className="list bg-gray-200 mt-8 p-10 rounded">
        {wishList.length ?
          <>
            {wishList.map((product) => <div key={product.id} className='pt-4 pb-2 border-b-[1px] border-black flex flex-col md:flex-row items-center justify-start'>
              <div className='image h-[150px] w-[150px] mb-20'>
                <img src={product.imageCover} alt="" className='w-full' />
              </div>
              <div className='w-full flex items-center justify-between'>
                <div className='details px-8' >
                  <h2 className='font-semibold text-xl'>{product.title}</h2>
                  <span className='text-green-600 font-semibold text-xl'>{product.price} EGP</span>
                  <div className='text-red-600 cursor-pointer' onClick={() => { setLoading(true)
                    removeFromWishList(product.id)
                  }}>
                    <i className="fa-solid fa-trash pe-2"></i>Remove
                  </div>
                </div>
                <button onClick={() => addToCart(product.id)} className='px-4 bg-green-600 font-semibold text-xl text-white rounded py-2 my-2'>Add To Cart</button>
              </div>
            </div>)}
          </>
          : <h3>Your WishList is empty</h3>
        }
      </div>
    }
  </>
}


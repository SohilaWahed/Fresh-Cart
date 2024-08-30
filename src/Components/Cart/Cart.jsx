import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Cart() {

  let { cart, setCart , getCart } = useContext(CartContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getCart()
  }, [])

  async function updateCountProduct(productId, count) {
    if (count > 0) {
      try {
        setLoading(true)
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
          count
        }, {
          headers: { token: localStorage.getItem('userToken') }
        })
        setCart(data)
        console.log(data);
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    } else {
      deleteProductFromCart(productId)
    }
  }

  async function deleteProductFromCart(productId) {
    try {
      setLoading(true)
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: { token: localStorage.getItem('userToken') }
      })
      setCart(data)
      console.log(data);
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (<>
    <h1 className="text-5xl md:mt-20 text-center">Cart</h1>
    { loading ?
      <div className='flex justify-center items-center my-12'>
        <Loading />
      </div> :
      <>
        {cart ? <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-8">
          < table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-3 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.data.products.map((prod) =>
                <tr key={prod.product.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="p-4">
                    <img src={prod.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {prod.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button onClick={() => updateCountProduct(prod.product.id, prod.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                        </svg>
                      </button>
                      <div>
                        <span>{prod.count}</span>
                      </div>
                      <button onClick={() => updateCountProduct(prod.product.id, prod.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200" type="button">
                        <span className="sr-only">Quantity button</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-3 py-4 font-semibold text-gray-900 ">
                    {prod.price}EGP
                  </td>
                  <td className="px-6 py-4">
                    <button className="font-medium text-red-600 " onClick={() => deleteProductFromCart(prod.product.id)}>Remove</button>
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr>
                <th className='py-4 text-center text-2xl  text-gray-900' colSpan={2} >Total</th>
                <th className='py-4 text-2xl text-gray-900' colSpan={2}>{cart.data.totalCartPrice}</th>
                <th className='py-4 text-xl'><Link to={'/checkout'}><button className='bg-emerald-600 text-white py-1 px-4 rounded-md'>Paid</button></Link></th>
              </tr>
            </tfoot>
          </table >
        </div > : ''}
      </>
    }
  </>
)}

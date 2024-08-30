import React, { useContext, useEffect, useState } from 'react'
import style from './AllOrders.module.css'
import { CartContext } from '../../Context/CartContext'

export default function AllOrders() {

  let { clearCart } = useContext(CartContext)
  useEffect(() => {
    clearCart()
  }, [])

  return <>
    <h1 className="text-5xl md:mt-20 text-center">All Orders</h1>
  </>
}

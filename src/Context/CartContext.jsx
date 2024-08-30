import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext()

export default function CartContextProvider({ children }) {

    const [cart, setCart] = useState(null)
    async function addToCart(productId) {
        try {
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
                productId
            }, {
                headers: { token: localStorage.getItem('userToken') }
            })
            toast.success(data.message, { style: { backgroundColor: '#22c55e' } });
            setCart(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getCart() {
        try {
            let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',
                { headers: { token: localStorage.getItem('userToken') } })
            setCart(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function clearCart(productId) {
        try {
          setLoading(true)
          let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/`, {
            headers: { token: localStorage.getItem('userToken') }
          })
          console.log(data);
          setCart([])
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {
        getCart()
    }, [])

    return (<>
        <CartContext.Provider value={{ addToCart, cart, setCart, getCart ,clearCart }}>
            {children}
        </CartContext.Provider>
    </>)


}
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let ProductsContext = createContext()

export default function ProductsContextProvider({ children }) {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [wishList, setWishList] = useState([]);


  async function getAllProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
      setProducts(data.data)
      console.log(products)
    } catch (error) {
      console.log(error);
    }
  }

  async function getAllCategories() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
      setCategories(data.data)
    } catch (err) {
      console.log(err);
    }
  }

  async function getAllWishProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: localStorage.getItem('userToken') }
      })
      setWishList(data.data)
    } catch (error) {
      console.log(error);
      setLodaing(false)
    }
  }

  async function addToWishList(productId) {
    try {
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
        productId
      }, {
        headers: { token: localStorage.getItem('userToken') }
      })
      getAllWishProducts()
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishList(productId) {
    try {
      let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers: { token: localStorage.getItem('userToken') }
      })
      getAllWishProducts()
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllProducts()
    getAllCategories()
    getAllWishProducts()
  }, [])

  return (
    <ProductsContext.Provider value={{ products, setProducts, categories, setCategories, getAllCategories, addToWishList, removeFromWishList, getAllWishProducts, wishList, setWishList }}>
      {children}
    </ProductsContext.Provider>
  )
}
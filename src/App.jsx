import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Products from './Components/Products/Products.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import WishList from './Components/WishList/WishList.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import Checkout from './Components/Checkout/Checkout.jsx'
import Login from './Components/Login/Login.jsx'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx'
import OtpCode from './Components/OtpCode/OtpCode.jsx'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'
import Register from './Components/Register/Register.jsx'
import Notfound from './Components/Notfound/Notfound.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import UserContextProvider from './Context/UserContext.jsx'
import ProductsContextProvider from './Context/ProductsContext.jsx'
import CartContextProvider from './Context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'


let routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index:true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'Fresh-Cart/products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'Fresh-Cart/cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'Fresh-Cart/productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'Fresh-Cart/categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'Fresh-Cart/brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'Fresh-Cart/wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'Fresh-Cart/checkout', element: <ProtectedRoute><Checkout/></ProtectedRoute> },
      { path: 'Fresh-Cart/allorders', element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
      { path: 'Fresh-Cart/login', element: <Login /> },
      { path: 'Fresh-Cart/forget-password', element: <ForgetPassword /> },
      { path: 'Fresh-Cart/verify-code', element: <OtpCode /> },
      { path: 'Fresh-Cart/reset-password', element: <ResetPassword /> },
      { path: 'Fresh-Cart/register', element: <Register /> },
      { path: '*', element: <Notfound /> },
    ]
  }
])

function App() {

  return (
    <UserContextProvider>
      <CartContextProvider>
        <ProductsContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster/>
        </ProductsContextProvider>
      </CartContextProvider>
    </UserContextProvider>
  )
}

export default App

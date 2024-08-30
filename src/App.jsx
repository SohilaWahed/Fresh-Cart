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
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><Checkout/></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
      { path: 'login', element: <Login /> },
      { path: 'forget-password', element: <ForgetPassword /> },
      { path: 'verify-code', element: <OtpCode /> },
      { path: 'reset-password', element: <ResetPassword /> },
      { path: 'register', element: <Register /> },
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

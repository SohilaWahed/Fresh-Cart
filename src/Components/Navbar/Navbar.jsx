import React, { useContext, useEffect, useRef, useState } from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from "../../Context/UserContext.jsx";
import { CartContext } from '../../Context/CartContext.jsx';

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };


  let { cart } = useContext(CartContext)
  let { userToken, setUserToken } = useContext(UserContext)
  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')
  }

  return <>
    <nav className='bg-gray-200  md:fixed top-0 inset-x-0 z-50 text-center capitalize'>
      <div className="container p-5 mx-auto flex flex-wrap justify-between items-center text-gray-500">
        <Link to={'/'}><img src={logo} width={150} alt="" /></Link>
        <button data-collapse-toggle="navbar-dropdown" type="button" onClick={toggleMenu} className={`inline-flex items-center w-10 h-10 justify-center text-sm border-[1px] border-gray-500  text-gray-500 rounded-lg lg:hidden focus:outline-none focus:ring-2 focus:ring-gray-200`} aria-controls="navbar-dropdown" aria-expanded="false">
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
        {isMenuOpen && (<div className='w-full lg:hidden text-start'>
          {userToken && <ul>
            <li className='py-2'><NavLink to="">Home</NavLink></li>
            <li className='py-2'><NavLink to="cart">Cart</NavLink></li>
            <li className='py-2'><NavLink to="wishList">Wish List</NavLink></li>
            <li className='py-2'><NavLink to="products">Products</NavLink></li>
            <li className='py-2'><NavLink to="Categories">categories</NavLink></li>
            <li className='py-2'><NavLink to="Brands">brands</NavLink></li>
          </ul>
          }
          {userToken ? <ul><li className='py-2'><span className='cursor-pointer' onClick={() => logout()}>logout</span></li></ul> :
            <ul>
              <li className='py-2'><NavLink to="login">Login</NavLink></li>
              <li className='py-2'><NavLink to="register">Register</NavLink></li>
            </ul>
          }
        </div>
        )}
        <div className='hidden lg:block'>
          {userToken &&
            <ul className='flex flex-col md:flex-row space-x-3'>
              <li><NavLink to="">Home</NavLink></li>
              <li><NavLink to="cart">Cart</NavLink></li>
              <li><NavLink to="wishList">Wish List</NavLink></li>
              <li><NavLink to="products">Products</NavLink></li>
              <li><NavLink to="Categories">categories</NavLink></li>
              <li><NavLink to="Brands">brands</NavLink></li>
            </ul>
          }
        </div>
        <div className='hidden lg:block'>
          <ul className='flex flex-col md:flex-row space-x-3'>
            {userToken ?
              <>
                <li className='relative'>
                  <Link to={'/cart'}>
                    <i className="fa-solid fa-cart-shopping fa-2xl text-green-500"></i><span className='text-white text-lg font-semibold absolute left-1/2 top-[-8px]'>{cart ? cart.numOfCartItems : 0}</span>
                  </Link>
                </li>
                <li><span className='cursor-pointer' onClick={() => logout()}>logout</span></li>
              </> :
              <>
                <li><NavLink to="login">Login</NavLink></li>
                <li><NavLink to="register">Register</NavLink></li>
              </>
            }
          </ul>
        </div>
      </div >
    </nav >
  </>
}

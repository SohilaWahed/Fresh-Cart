import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'

export default function Layout() {

  return <>
    <Navbar />
    <div className="container px-5 py-5 mx-auto">
      <Outlet></Outlet>
    </div>
  </>
}

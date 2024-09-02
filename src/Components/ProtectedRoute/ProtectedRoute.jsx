import React, { useState } from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate } from 'react-router-dom'


/* i use this component to when the user is not registered to log in,
 he cannot access any part of the site through the path*/

export default function ProtectedRoute({children}) {

  if (localStorage.getItem('userToken')) {
    return children
  }else{
    return <Navigate to={'Fresh-Cart/login'}></Navigate>
  }
}

import React from 'react'
import Login from './components/login'
import Register from './components/register'
import VerifyOTP from './components/verifyotp'

export default function(){
  return(
    <>
    <Register/>
    <Login/>
    <VerifyOTP/>
  </>
  )
}
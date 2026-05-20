import React from 'react'
import Login from './components/login'
import Register from './components/register'
import VerifyOTP from './components/verifyotp'
import HeroSection from './components/blogs/herosection'
import Navbar from './components/blogs/navbar'
import Footer from './components/blogs/footer'
import FeaturedCategories from './components/blogs/features'

export default function(){
  return(
    <>
    <Navbar/>
    <HeroSection/>
    <FeaturedCategories/>
    <Footer/>
   
  </>
  )
}
import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder'
import Footer from './Components/Footer/Footer'
import Login from './Components/LoginPopUp/Login'
// import { ToastContainer} from 'react-toastify';
import { useState } from 'react'

const App = () => {
  const [showLogin,setShowLogin] =useState(false);

  return (
   <>
   {/* <ToastContainer/> */}
   {showLogin?<Login setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      {/*This Navbar is displayed on all pages */}
    <Navbar setShowLogin={setShowLogin}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/order" element={<PlaceOrder/>}/>
    </Routes>
    </div>
     {/* This Footer will we Displayed on all pages */}
    <Footer/>
   </>
  )
}

export default App

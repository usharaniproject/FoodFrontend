import React, { useContext } from 'react'
import './Login.css'
import axios from 'axios'
import { useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const Login = ({setShowLogin}) => {
     
    const {url,setToken} =useContext(StoreContext) 
    const [currState,setCurrState]= useState("Login");
    const [data,setData] = useState({
      name:"",
      email:"",
      password:""
    })
      
    const onChangeHandler = (event) =>{
      const name=event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

   const onLogin = async (event) =>{
        event.preventDefault();
        let newUrl = url;
        if(currState ==="Login"){
          newUrl += "/api/user/login"
        }
        else{
          newUrl += '/api/user/register'
        }

        const response = await axios.post(newUrl,data)

        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem("token",response.data.token)
          setShowLogin(false);
        }
        else{
          alert(response.data.message)
        }

   }

  return (
    <div className='login-popup'>
     <form action="" className="login-popup-container" onSubmit={onLogin}>
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>: <input type='text' name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter your Name' required/>}
            <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Enter your email' required/>
            <input type='password' name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Password' required/>
        </div>
        <button type="submit">{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to teh terms of use & privacy policy</p>
        </div>
        {currState==="Login"
        ? <p>Create a new Accout? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
        : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
        } 
     </form>
    </div>
  )
}

export default Login

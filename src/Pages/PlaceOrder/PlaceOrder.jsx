import React, { useContext,useState } from 'react'
import './PlaceOrder.css'
// import { toast } from 'react-toastify';
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} =useContext(StoreContext)
  const [data,setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler =(event) =>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }
    
  const placeOrder = async (event)=>{
       event.preventDefault();
       let orderItmes=[];
       food_list.map((item)=>{
        if(cartItems[item._id]>0){
            let itemInfo = item;
            itemInfo["qunatity"]=cartItems[item._id];
            orderItmes.push(itemInfo)
        }
       })
      let orderData = {
        address:data,
        items:orderItmes,
        amount:getTotalCartAmount()+10
      }
      let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
      if(response.data.success){
        const {session_url}= response.data;
        window.location.replace(session_url);
        confirm("Order placed");
        console.log("Order placed");

        // toast.success(response.data.message)
      }
      // else{
      //   alert(response.data.message)
      // }
      
  }
     

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="placeorder-left">
      <p className="title">Delivery Information</p>
      <div className="multi-fields">
        <input onChange={onChangeHandler} name="firstname" value={data.firstname} type="text"  placeholder='Enter First Name' required/>
        <input onChange={onChangeHandler} name="lastname" value={data.lastname} type="text" placeholder='Enter Last Name' required/>
      </div>
      <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Email Address' required/>
      <input type="text" onChange={onChangeHandler} name="street" value={data.street} placeholder='Street' required/>
      <div className="multi-fields">
        <input onChange={onChangeHandler} name="city" value={data.city} type="text" placeholder='City' required/>
        <input onChange={onChangeHandler} name="state" value={data.state} type="text" placeholder='State' required/>
      </div>
      <div className="multi-fields">
        <input onChange={onChangeHandler} name="zipcode" value={data.zipcode} type="text" placeholder='Zip Code' required/>
        <input onChange={onChangeHandler} name="country" value={data.country} type="text" placeholder='Country' required/>
      </div>
      <input onChange={onChangeHandler} name="phone" value={data.phone} type='text' placeholder='Phone' required/>
      </div>
      <div className="placeorder-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:10}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Total</p>
              <p>${getTotalCartAmount()===0?0:getTotalCartAmount()+10}</p>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder

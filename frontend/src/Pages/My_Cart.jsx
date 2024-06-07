import React from 'react'
import "../../public/My_Cart.css"
import axios from "axios"
import Cart from './Cart'
const My_Cart = () => {
  let [arr,setarr] = React.useState([]);
  React.useEffect(()=>{
    async function fetchDetails(){
      let response = await axios.get("http://localhost:3000/cart");
      setarr(response.data);
    }
    fetchDetails() 
  },[]);
  function handledelete(id){
    let x = arr.filter(item => item.classID !== id)
    setarr(x);
  }
  return (
    <div className='my_cart'>
        <h1>Your Cart</h1>
        <div className='boxes'>
          <div className="boxa">Image</div>
          <div className="boxb">Course Name</div>
          <div className="boxc">Available Seats</div>
          <div className="boxd">Instructor Name</div>
          <div className="boxe">Enroll</div>
          <div className="boxf">Remove</div>
        </div>
        {
          arr.map((item,index)=>{return <Cart key ={item.classID} id = {item.classID} handleDeletion={handledelete}/>})
        }
    </div>
  )
}

export default My_Cart

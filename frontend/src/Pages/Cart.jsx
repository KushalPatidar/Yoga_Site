import React from 'react'
import axios from "axios"
import "../../public/Cart.css"
//https://github.com/caroso1222/notyf
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { NavLink } from 'react-router-dom';
const notyf = new Notyf({
  position:{x:'right',y:'top'},
  dismissible : true,
  duration : 3000,
  types: [
    {
      type: 'info',
      background: 'orange',
      icon: false,
    }
  ]
});
const Cart = (props) => {
  let [item,setitem] = React.useState({});
  React.useEffect(()=>{
    async function fetchDetails(){
        const response = await axios.get(`http://localhost:3000/class_by_id/${props.id}`);
        setitem(response.data);

    }
    fetchDetails();
  },[]);
  const handelEnroll = async() =>{
    try {
      const response = await axios.post('http://localhost:3000/Enroll',{id:props.id});
      const a = response.data;
      if(a===1){
        notyf.success("Enrolled Successfully!");
      }
      else if(a===0){
        notyf.open({
          type: 'info',
          message: 'Please login to Enroll'
        });
      }
      else if(a===3){
        notyf.open({
          type: 'info',
          message: 'No Seat Available'
        });
      }
      else{
        notyf.open({
          type: 'info',
          message: 'Already Enrolled'
        });
      }
    }catch (error) {
      notyf.error("Oops! An error occurred.");
    }
  }
  const handleDelete = async() =>{
    try {
      const response = await axios.post(`http://localhost:3000/delete_cart_item`, { id: props.id });
      props.handleDeletion(props.id);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  }
  return (
    // to={"/specific_class/:"+props.id} 
    <div className='cart'>
       <img src={item.imageURL} alt="" /> 
       <div className="name">{item.name}</div>  
       <div className="availableSeats">{item.availableSeats}</div>  
       <div className="instructor">{item.instructorName}</div> 
       <button onClick={handelEnroll} className='enroll_btn'>Enroll</button>
       <button onClick={handleDelete}className='remove_btn'>Remove</button>
    </div>
  )
}

export default Cart

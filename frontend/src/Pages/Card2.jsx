import React from 'react'
import axios from 'axios';
import "../../public/Card.css"
import { NavLink } from 'react-router-dom';
//https://github.com/caroso1222/notyf
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
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
const Card2 = (props) => {
  const {_id,name,availableSeats,price,imageURL,totalStudentEnrolled,instructorName} = props.a;
  const notify = async()=>{
    try {
      const response = await axios.post('http://localhost:3000/Add_to_cart',{ _id });
      const a = response.data;
      if(a===1){
        notyf.success("Added Successfully!");
      }
      else if(a===0){
        notyf.open({
          type: 'info',
          message: 'Please login to add item to cart'
        });
      }
      else{
        notyf.open({
          type: 'info',
          message: 'Already Present in the Cart'
        });
      }
    }catch (error) {
      notyf.error("Oops! An error occurred.");
    }
  }
  return (
    <div className='card'>
      <img src={imageURL} alt="" />
      <div>
        <h2>{name}</h2>
        <h6 className='ins'>Instructor : {instructorName}</h6>
        <p>Available Seats : {availableSeats}</p>
        <p><b>Price : $ {price}</b></p>
        <p>Total Students : {totalStudentEnrolled}</p>
        <NavLink to={"specific_class/"+_id}>
            <button className='btn_select'>View</button>
        </NavLink>
        <button className='btn_add_to_cart' onClick={notify}>Add to Cart</button>
    
      </div>
    </div>
  )
}

export default Card2

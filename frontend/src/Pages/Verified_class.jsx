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
const Verified_class = (props) => {
  const {_id,name,availableSeats,price,imageURL,totalStudentEnrolled,instructorName} = props.item;
  const notify = async()=>{
    try {
      const response = await axios.post('http://localhost:3000/delete-class',{ _id });
      const a = response.data;
      notyf.success("Deleted Successfully!");
      props.handleDelete(_id);
    }catch (error) {
      notyf.error("Oops! An error occurred.");
    }
  }
  return (
    <div className='card'>
      <img src={imageURL} alt="" />
      <div>
        <h2 style={{"textAlign":"center"}}>{name}</h2>
        <h6 className='ins'>Instructor : {instructorName}</h6>
        <p>Available Seats : {availableSeats}</p>
        <p><b>Price : $ {price}</b></p>
        <p>Total Students : {totalStudentEnrolled}</p>
        <NavLink to={"specific_class/"+_id}>
            <button className='btn_select'>View</button>
        </NavLink>
        <button className='delete-class' onClick={notify}>Delete</button>
    
      </div>
    </div>
  )
}

export default Verified_class

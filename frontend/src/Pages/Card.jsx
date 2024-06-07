import React from 'react'
import "../../public/Card.css"
import { NavLink } from 'react-router-dom';
const Card = (props) => {
  const {_id,name,availableSeats,price,imageURL,totalStudentEnrolled} = props.a;
  return (
    <div className='card'>
      <img src={imageURL} alt="" />
      <div>
        <h2>{name}</h2>
        <p>Available Seats : {availableSeats}</p>
        <p><b>Price : $ {price}</b></p>
        <p>Total Students : {totalStudentEnrolled}</p>
        <NavLink to={"specific_class/"+_id}>
            <button className='btn_select1'>View</button>
        </NavLink>
      </div>
    </div>
  )
}

export default Card

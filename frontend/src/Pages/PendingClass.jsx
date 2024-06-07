import React from 'react'
import axios from "axios"
import "../../public/ins.css"
const PendingClass = (props) => {
  const handleApprove = async() =>{
        let id = props.item._id;
        let response = await axios.post("http://localhost:3000/approve-class",{id});
        props.handleDelete(props.item._id);
  }
  const handleReject = async() =>{
    try{
        let response = await axios.post("http://localhost:3000/reject-class",{id:props.item._id});
        props.handleDelete(props.item._id);
    }
    catch(err){
        console.error(err);
    }
  }
  return (
    <div className='inst'>
    <div className="left-ins-box">
      <img src={props.item.imageURL} alt="" />
      <button onClick={handleApprove}>Approve</button>
      <button onClick={handleReject} style={{"backgroundColor":"Red"}}>Reject</button>
    </div>
    <div className="right-ins-box">
         <h1>Instructor Name : <b>{props.item.instructorName}</b></h1>
         <h1>Instructor Email : <b>{props.item.instructorEmail}</b></h1>
         <h1>Name : <b>{props.item.name}</b></h1>
         <h1>Price : <b>{props.item.price}</b></h1>
         <h1>Total Seats : <b>{props.item.availableSeats}</b></h1>
         <h2>Description </h2>
         <p>{props.item.description }</p>
    </div>
  </div>
  )
}

export default PendingClass

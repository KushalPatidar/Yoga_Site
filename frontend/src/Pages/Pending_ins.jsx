import React from 'react'
import axios from "axios"
import "../../public/ins.css"
const Pending_ins = (props) => {
  const handleApprove = async() =>{
    let id = props.item._id;
    let response = await axios.post("http://localhost:3000/approve-ins",{id});
    props.handleDelete(props.item._id);
  }
  const handleReject = async() =>{
    try{
        let response = await axios.post("http://localhost:3000/reject-ins",{id:props.item._id});
        props.handleDelete(props.item._id);
    }
    catch(err){
        console.error(err);
    }
  }
  return (
    <div className='inst'>
      <div className="left-ins-box">
        <img src={props.item.photoURL} alt="" />
        <button onClick={handleApprove}>Approve</button>
        <button onClick={handleReject} style={{"backgroundColor":"Red"}}>Reject</button>
      </div>
      <div className="right-ins-box">
           <h1>Instructor Name : <b>{props.item.name}</b></h1>
           <h1>Instructor Email : <b>{props.item.email}</b></h1>
           <h1>Gender : <b>{props.item.gender}</b></h1>
           <h1>Contact No : <b>{props.item.phone}</b></h1>
           <h2>Experience</h2>
           <p>{props.item.experience}</p>
      </div>
    </div>
  )
}

export default Pending_ins

import React from 'react'
import axios from "axios"
import "../../public/VerifiedIns.css"
const Inst = (props) => {
  const handleClick = async() =>{
    let response = await axios.post("http://localhost:3000/reject-ins",{id:props.item._id});
    props.handleDelete(props.item._id);
  }
  return (
    <div className='insCard'>
        <img src={props.item.photoURL} alt="" />
        <div>
          <p className='ins'>Instructor Mail: {props.item.email}</p>
          <h6 className='ins'>Instructor Name: {props.item.name}</h6>
          <p>Gender : {props.item.gender}</p>
          <p style={{color:"green"}}>Address : {props.item.address}</p>
          <p>Contact No : {props.item.phone}</p>
        </div>
    </div>
  )
}

export default Inst

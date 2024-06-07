import React ,{ useEffect , useState } from 'react'
import {useParams } from "react-router-dom";
import axios from 'axios';
import "../../public/specific_class.css"
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
const Specific_Class = (props) => {
  const { id } = useParams();
  const [details,setDetails] = useState({});
  useEffect(()=>{
    async function fetchClassDetails(){
      let response = await axios.get(`http://localhost:3000/specific_class/${id}`);
      setDetails(response.data);
    }
    fetchClassDetails();
  },[]);
  const handelEnroll = async() =>{
    try {
      const response = await axios.post('http://localhost:3000/Enroll',{id:id});
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
  const notify = async()=>{
    try {
      const response = await axios.post('http://localhost:3000/Add_to_cart',{ _id : id});
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
    <>
    <div className='sp'>
         <div className="sp1">
          <h1 style={{"textAlign":"center",fontSize:"45px",color:"#1f4662"}}>Demo Video</h1>
          <iframe src={"https://www.youtube.com/embed/"+details.videoID} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
         </div> 
        <div className='spcart'>
          <h1 style={{"textAlign":"center",fontSize:"45px",color:"#1f4662",marginTop:"15px",marginBottom:"5px"}}>Class Details</h1>
          <p>Class Name : <b>{details.name}</b></p>
          <p>Availabel Seats : <b>{details.availableSeats}</b></p>
          <p>Price : <b>{details.price}</b></p>
          <p>Instructor Name : <b>{details.instructorName}</b></p>
          <p>Instructor Email : <b>{details.instructorEmail}</b></p>
          <p>Total Enrolled Student: <b>{details.totalStudentEnrolled}</b></p>
          <button className='sp_btn_add_to_cart' onClick={notify}>Add to Cart</button>
          <button onClick={handelEnroll} className='sp_enroll_btn'>Enroll</button>
        </div>
    </div>
    <div>
    <h1 style={{"textAlign":"center",fontSize:"45px",color:"#1f4662",marginTop:"15px",marginBottom:"5px"}}>Description</h1>
    <p style={{color:"gray",width:"70%",marginLeft:"15%"}}>{details.description}</p>
    </div>
    </>
  )
}

export default Specific_Class

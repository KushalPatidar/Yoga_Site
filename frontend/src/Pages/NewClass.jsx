import React, { useState } from 'react'
import "../../public/NewClass.css"
import axios from "axios"
import { Notyf } from 'notyf';
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
const NewClass = () => {
  let [className,setClassName] = useState('');
  let [totalSeats,setTotalSeats] = useState('');
  let [instructorName,setInstructorName] = useState('');
  let [instructorEmail,setInstructorEmail] = useState('');
  let [price,setPrice] = useState('');
  let [description,setDescription] = useState('');
  let [imageURL,setimageURL] = useState('');
  let [videoID,setVideoID] = useState('');
  const handleSubmit = async(e) => {
    try{
        e.preventDefault();
            const response = await axios.post("http://localhost:3000/new_class",{className,totalSeats,price,videoID,description,instructorName,instructorEmail,imageURL});
            if(response.data===1){
              notyf.success("Request Sent to admin")
              setClassName('');
              setTotalSeats('');
              setInstructorName('');
              setInstructorEmail('');
              setPrice('');
              setDescription('');
              setimageURL('');
              setVideoID('');
            }          
    }
    catch(err){
        console.error(err);
    }
  }
  return (
    <form className='new-class' onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter Class Name'  value={className} onChange={(e) => setClassName(e.target.value)} required />
        <input type="text" placeholder='Enter the Image URL' value ={imageURL} onChange={(e) => setimageURL(e.target.value)} required />
        <input type="text" placeholder='Enter the Instructor Name' value ={instructorName} onChange={(e) => setInstructorName(e.target.value)} required />
        <input type="text" placeholder='Enter the Insstructor Email' value ={instructorEmail} onChange={(e) => setInstructorEmail(e.target.value)} required />
        <input type="text" placeholder='Enter Price in Dollar' value ={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder='Enter Total Seats' value ={totalSeats} onChange={(e) => setTotalSeats(e.target.value)} required />
        <input type="text" placeholder='Enter Video Link' value ={videoID} onChange={(e) => setVideoID(e.target.value)} required />
        <textarea placeholder="Description" value={description} cols="39" rows="3" onChange={(e) => setDescription(e.target.value)} required/>
        <button>Add New Class</button>
    </form>
  )
}

export default NewClass

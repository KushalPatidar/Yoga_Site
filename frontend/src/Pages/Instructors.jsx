import React, { useEffect, useState } from 'react'
import axios from "axios"
import Inst from './Inst';
import "../../public/ad_total_ins.css"
const Instructors = () => {
  let [arr,setarr] = useState([]);
  useEffect(()=>{
    async function fetchDetails(){
      let response = await axios.get("http://localhost:3000/approved-instructor");
      setarr(response.data);
    }
    fetchDetails();
  },[])
  function handleDelete(id){
    let x = arr.filter((item)=>{return item._id!=id});
    setarr(x);
  }
  return (
    <div>
         <h1 style={{"text-align":"center"}}>All Instructors</h1>
         <div className='ad_total_ins'>
            {
              arr.map((item,index)=>{
                return  <Inst key={item._id}  item={item} handleDelete={handleDelete}/>
              })
            }
         </div>
    </div>
  )
}

export default Instructors

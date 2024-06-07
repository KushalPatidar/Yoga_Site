import React, { useEffect, useState } from 'react'
import axios from "axios"
import Verified_class from './Verified_class'
import "../../public/ad_total_class.css"
const Ad_Total_classes = () => {
  let [arr,setarr] = useState([]);
  useEffect(()=>{
    async function fetchDetails(){
      let response = await axios.get("http://localhost:3000/approved_classes");
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
         <h1 style={{"text-align":"center"}}>All Approved Classes</h1>
         <div className='ad_total_class'>
            {
              arr.map((item,index)=>{
                return  <Verified_class key={item._id}  item={item} handleDelete={handleDelete}/>
              })
            }
         </div>
    </div>
  )
}

export default Ad_Total_classes

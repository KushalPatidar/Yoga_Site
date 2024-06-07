import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../../public/pendingIns.css"
import Pending_ins from './Pending_ins'
const Ad_PendingIns = () => {
  let [arr,setarr] = useState([]);
  useEffect(()=>{
    async function fetchDetails(){
      let response = await axios.get("http://localhost:3000/pending-instructor");
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
      <h1 style={{"text-align":"center"}}>Pending Instructors</h1>
      {
        arr.map((item,index)=>{
          return  <Pending_ins key={item._id} item={item} handleDelete={handleDelete}/>
        })
      }
    </div>
  )
}

export default Ad_PendingIns

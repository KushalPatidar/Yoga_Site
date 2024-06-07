import React, { useEffect, useState } from 'react'
import axios from "axios"
import "../../public/pendingClasses.css"
import PendingClass from './PendingClass'
const Ad_PendingClasses = () => {
  let [arr,setarr] = useState([]);
  useEffect(()=>{
    async function fetchDetails(){
      let response = await axios.get("http://localhost:3000/pending-classes");
      setarr(response.data);
      console.log(response.data);
    }
    fetchDetails();
  },[])
  function handleDelete(id){
    let x = arr.filter((item)=>{return item._id!=id});
    setarr(x);
  }
  return (
    <div>
      <h1 style={{"text-align":"center"}}>Pending Classes</h1>
      {
        arr.map((item,index)=>{
          return  <PendingClass key={item._id} item={item} handleDelete={handleDelete}/>
        })
      }
    </div>
  )
}
export default Ad_PendingClasses

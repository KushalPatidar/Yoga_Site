import React, { useEffect, useState } from 'react'
import axios from "axios"
import Card3 from './Card3'
import "../../public/ad_total_class.css"
const Inst_all_class = () => {
  let [arr,setarr] = useState([]);
  useEffect(()=>{
    async function fetchDetails(){
      let response = await axios.get("http://localhost:3000/classes_by_instructor");
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
         <h1 style={{"text-align":"center",marginTop:"30px"}}>Your All Classes</h1>
         <div className='ad_total_class'>
            {
              arr.map((item,index)=>{
                return  <Card3 key={item._id}  item={item} handleDelete={handleDelete}/>
              })
            }
         </div>
    </div>
  )
}

export default Inst_all_class

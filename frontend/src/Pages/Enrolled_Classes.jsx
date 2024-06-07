import React from 'react'
import "../../public/Enrolled_Classes.css"
import axios from "axios"
import Enrolled_class from './Enrolled_class'
const Enrolled_Classes = () => {
  let [arr,setarr] = React.useState([]);
  React.useEffect(()=>{
    async function fetchDetails(){
      let response = await axios.get("http://localhost:3000/enrolled-classes");
      setarr(response.data);
    }
    fetchDetails() 
  },[]);
  return (
    <div className='enrolled-classes'>
       <h1>Your Enrolled Classes</h1>
       <div className="en-classes">
         {
          arr.map((item,index)=>{return <Enrolled_class key ={item.classID} id = {item.classID} />})
         }
       </div>
    </div>
  )
}

export default Enrolled_Classes

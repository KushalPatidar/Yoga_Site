import React from 'react'
import "../../public/Enrolled_class.css"
import { NavLink } from 'react-router-dom'
import axios from 'axios'
const Enrolled_class = (props) => {
  let [item,setitem] = React.useState({});
  React.useEffect(()=>{
        async function fetchDetails(){
            const response = await axios.get(`http://localhost:3000/class_by_id/${props.id}`);
            setitem(response.data);
    
        }
        fetchDetails();
      },[]);
  return (
    <div className="en-class">
         <img src={item.imageURL} alt="" />
         <div className="right-box">
           <h2>Name : {item.name}</h2>
           <p>Instructor : {item.instructorName}</p>
           <h2>Instructor Mail: {item.instructorEmail}</h2>
           <NavLink to={"specific_class/"+props.id}>
            <button>View</button>
           </NavLink>
         </div>
    </div>
  )
}

export default Enrolled_class

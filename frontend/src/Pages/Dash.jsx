import React from 'react'
import axios from "axios"
import "../../public/Dash.css"
const Dash = () => {
  let [name,setname] = React.useState('');
  React.useEffect(()=>{
    async function fetchName(){
      let res = await axios.get("http://localhost:3000/name");
      setname(res.data);
    }
    fetchName();
  },[]);
  return (
    <div className='dashB'>
         <h1>Hii {name} !!</h1>
         <p>Welcome to your Dashboard!</p>
         <img src="../../public/Dashboard.png" alt="" />
    </div>
  )
}

export default Dash

import React, { useEffect } from 'react'
import axios from "axios"
import "../../public/Ad_Dash.css"
const Ad_Dash = () => {
  let [arr,setarr] = React.useState([]);
  useEffect(()=>{
    async function fetchDetails(){
      let response = await axios.get("http://localhost:3000/admin");
      setarr(response.data);
    }
    fetchDetails();
  },[]);
  return (
    <div className='ad_dash'>
      <div className="adbox">
      <img src="../../public/pending2.png" alt="" />
      <div>
        <p>Total Enrolled User</p>
        <h4>{arr[0]}</h4>
      </div>
      </div>
      <div className="adbox">
      <img src="../../public/pending_.jpg" alt="" />
      <div>
        <p>No. of Pending Instructor</p>
        <h4>{arr[4]}</h4>
      </div>
      </div>
      <div className="adbox">
        <img src="../../public/total_classs.jpg" alt="" />
        <div>
          <p>No.  of Classes</p>
          <h4>{arr[2]}</h4>
        </div>
      </div>
      <div className="adbox">
      <img src="../../public/pending__.jpg" alt="" />
      <div>
        <p>No. of Pending Classes</p>
        <h4>{arr[3]}</h4>
      </div>
      </div>
      <div className="adbox">
      <img src="../../public/total_ins.jpg" alt="" />
      <div>
        <p>No. of Instructor</p>
        <h4>{arr[1]}</h4>
      </div>
      </div>

    </div>
  )
}

export default Ad_Dash

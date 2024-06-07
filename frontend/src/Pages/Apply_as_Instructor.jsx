import React, { useEffect } from 'react'
import axios from 'axios';
import Before_Apply from './Before_Apply';
import After_Apply1 from './After_Apply1';
import After_Apply2 from './After_Apply2';
const Apply_as_Instructor = () => {
  let [ck,setCk] = React.useState(0);
  useEffect(()=>{
    async function isApplied(){
      let response = await axios.get("http://localhost:3000/isapplied");
      if(response.data===1){setCk(1);}
      else if(response.data===2){setCk(2);}
    }
    isApplied();
  },[]);
  return (
    <div>
      {ck===0?<Before_Apply setCk={setCk}/>:
       ck===1?<After_Apply1 />:<After_Apply2 />}
    </div>
  )
}

export default Apply_as_Instructor

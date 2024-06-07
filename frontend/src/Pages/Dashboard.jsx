import React from 'react'
import "../../public/Dashboard.css"
import Dash from './Dash';
import My_Cart from './My_Cart';
import Enrolled_Classes from './Enrolled_Classes';
import Apply_as_Instructor from './Apply_as_Instructor';
import { useContext } from 'react';
import { AuthContext } from '../layout/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import axios from "axios"


const Dashboard = () => {
  const a = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleLogout(){
    // Add logout feature
    let out = await axios.get("http://localhost:3000/logout");
    a.logout();
    navigate("/");
  }
  const [ck,setck] = React.useState(0);
  return (
    <div className='dsh'>
      <div className="left">
          <div className="menu">
             <p>Menu</p>
          </div>
          <div className={ck===0 ? "special _btn" : "_btn"} onClick={()=>{setck(0)}}>
            <img src="../../public/dash.png" alt="" />
            <div>My Dashboard</div>
          </div>
          <div className={ck===1 ? "special _btn" : "_btn"} onClick={()=>{setck(1)}}>
            <img src="../../public/cart.png" alt="" />
            <div>Cart</div>
          </div>
          <div className={ck===2 ? "special _btn" : "_btn"} onClick={()=>{setck(2)}}>
            <img src="../../public/enroll.png" alt="" />
            <div>Enrolled Classes</div>
          </div>
          <div className={ck===3 ? "special _btn" : "_btn"} onClick={()=>{setck(3)}}>
            <img src="../../public/apply.jpg" alt="" />
            <div>Apply as Instructor</div>
          </div>
          <div className={ck===4 ? "special _btn" : "_btn"} onClick={()=>{setck(4)}}>
            <img src="../../public/logout.png" alt="" />
            <div onClick = {handleLogout}>Logout</div>
          </div>

      </div>
      <div className="right">
        {ck===0 && <Dash />}
        {ck===1 && <My_Cart />}
        {ck===2 && <Enrolled_Classes />}
        {ck===3 && <Apply_as_Instructor />}
      </div>
    </div>
  )
}
export default Dashboard

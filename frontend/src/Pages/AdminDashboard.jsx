import React from 'react'
import Ad_Dash from './Ad_Dash';
import Ad_PendingClasses from './Ad_PendingClasses';
import Ad_PendingIns from './Ad_PendingIns';
import Ad_Total_classes from './Ad_Total_classes';
import Ad_Total_Ins from './Ad_Total_Ins';
import { useContext } from 'react';
import { AuthContext } from '../layout/AuthProvider';


const AdminDashboard = () => {
  const a = useContext(AuthContext);
  React.useEffect(()=>{
    a.setIsLoggedIn(3);
  },[])
  const [ck,setck] = React.useState(0);
  return (
    <div>
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
            <img src="../../public/pending.png" alt="" />
            <div>Pending Classes</div>
          </div>
          <div className={ck===2 ? "special _btn" : "_btn"} onClick={()=>{setck(2)}}>
            <img src="../../public/class.png" alt="" />
            <div>Approved Classes</div>
          </div>
          <div className={ck===3 ? "special _btn" : "_btn"} onClick={()=>{setck(3)}}>
            <img src="../../public/pending2.png" alt="" />
            <div>Pending Instructor</div>
          </div>
          <div className={ck===4 ? "special _btn" : "_btn"} onClick={()=>{setck(4)}}>
            <img src="../../public/ins.png" alt="" />
            <div>Verifed Instructor</div>
          </div>

      </div>
      <div className="right">
        {ck===0 && <Ad_Dash />}
        {ck===1 && <Ad_PendingClasses />}
        {ck===2 && <Ad_Total_classes />}
        {ck===3 && <Ad_PendingIns />}
        {ck===4 && <Ad_Total_Ins />}
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard

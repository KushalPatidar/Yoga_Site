import React from 'react'
import NewClass from './NewClass'
import Inst_all_class from './Inst_all_class'
import "../../public/instructor.css"
import { useContext } from 'react';
import { AuthContext } from '../layout/AuthProvider';

const Instructor = () => {
  const a = useContext(AuthContext);
  React.useEffect(()=>{
    a.setIsLoggedIn(2);
  },[])
  let [ck,setCk] = React.useState(0);
  return (
    <div>
       <div className="top">
        <button onClick={()=>{setCk(0)}}>Create New Class</button>
        <button onClick={()=>{setCk(1)}}>View Your Classes</button>
       </div>
      <div className='bottom'>
        {ck==0 ? <NewClass /> : <Inst_all_class />}
      </div>
    </div>
  )
}

export default Instructor

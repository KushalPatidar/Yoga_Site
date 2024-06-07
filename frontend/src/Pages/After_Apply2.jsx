import React from 'react'
import "../../public/a_apply2.css"
import { NavLink } from 'react-router-dom'
const After_Apply2 = () => {
  return (
    <div className='apply2'>
      <img src="../../public/congo2.png" alt="" />
      <h6>You are selected as Instructor 🤩🤩</h6>
      <NavLink to="/login"><button>Login</button></NavLink>
    </div>
  )
}

export default After_Apply2

import React, { useState } from 'react'
import "../../public/navbar.css"
import { NavLink } from 'react-router-dom'
import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from '../layout/AuthProvider';



const Navbar = () => {
  const a = useContext(AuthContext);
  async function handleLogout(){
    // Add logout feature
    let out = await axios.get("http://localhost:3000/logout");
    a.logout();
  }
  return (
    <nav>
        <div className='navleft'>
            <h2>Asana<b className='nav-b'>V</b>ibes </h2>
            <img src="../../logo.png" alt="" />
        </div>
        {
          a.isLoggedIn<2?
          <div className='navright'>
          <ul>
           <li><NavLink className="nav_element" to="/">Home</NavLink></li>
           <li><NavLink to="/instructors" className="nav_element">Instructors</NavLink></li>
           <li><NavLink to="/classes" className="nav_element">Classes</NavLink></li>
           {a.isLoggedIn===1?<li><NavLink to="/dashboard" className="nav_element">Dashboard</NavLink></li> :a.isLoggedIn===0?<li><NavLink to="/login" className="nav_element"><button className='login'>Login</button></NavLink></li>:<></>}
           {/* Show profile image of user if exist */}
           {a.isLoggedIn?<li><NavLink onClick = {handleLogout} ><button className='logout'>Logout</button></NavLink></li>:""}
          </ul>
       </div>
          : <div className='navright'>
          <ul>
           {a.isLoggedIn?<li><NavLink onClick = {handleLogout} ><button className='logout'>Logout</button></NavLink></li>:""}
          </ul>
       </div>
        }
        
    </nav>
  )
}

export default Navbar

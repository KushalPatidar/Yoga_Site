import React, { useState } from 'react';
import "../../public/login.css"
import { NavLink } from 'react-router-dom'
import axios from "axios"
axios.defaults.withCredentials = true;
import { Notyf } from 'notyf';
import { useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { AuthContext } from '../layout/AuthProvider';


const notyf = new Notyf({
  position: { x: 'right', y: 'top' },
  dismissible: true,
  duration: 3000,
  types: [
    {
      type: 'info',
      background: 'orange',
      icon: false,
    }
  ]
});

const Login = () => {
  const a = useContext(AuthContext);
  const navigate = useNavigate();
  const [role,setRole] = useState('');
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if(role===""){
        notyf.open({
          type: 'info',
          message: 'Select Specific Role!'
        });
      }
      else if (useremail.trim() !== '' && password.trim() !== '') { // Trim whitespaces before checking
        const response = await axios.post("http://localhost:3000/login", { email: useremail, password: password,role:role });
        // console.log(useremail,password,role);
        if (response.data === "Invalid Credentials") {
          notyf.error("Invalid Credentials");
        } else {
          notyf.success("Login Successful");
          if(role==="student"){
            a.setIsLoggedIn(1);
            navigate('/'); // Redirect to home page upon successful login
          }
          else if(role==="admin"){
            a.setIsLoggedIn(3);
            navigate("/admin");
          }
          else{
            a.setIsLoggedIn(2);
            navigate("/instructor");
          }
        }
      } else {
        notyf.open({
          type: 'info',
          message: 'Username or password is empty!'
        });
      }
    } catch (err) {
      console.log("Error:", err);
      notyf.error("Oops! An error occurred.");
    }
  };

  return (
    <div className='main'>
      <h1 className='login_h1'>Welcome Back !! 🤟🤟</h1>
      <form onSubmit={handleLogin}> 
      <label htmlFor="role">Role :</label><br />
      <select value={role} id="" onChange={(e)=>{setRole(e.target.value)}}>
         <option value="">Select Role</option>
         <option value="student">Student</option>
         <option value="instructor">Instructor</option>
         <option value="admin">Admin</option>
       </select>
       <br />
        <label htmlFor="email">Email :</label><br />
        <input type="email" name='email' placeholder='Your Email' value={useremail}
          onChange={(e) => setUseremail(e.target.value)} /><br />
        <label htmlFor="password">Password :</label><br />
        <input type="password" name='password' placeholder='Your Password' value={password}
          onChange={(e) => setPassword(e.target.value)} /><br />
        <button type="submit" className='login_btn'>Log In</button>
        <h4 className='login_h4'>Don't have an account?<NavLink className='login_navlink' to="/register"> Sign Up</NavLink></h4>
      </form>
    </div>
  );
};

export default Login;

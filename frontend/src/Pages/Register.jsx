import React , {useState} from 'react'
import "../../public/Register.css"
import { NavLink } from 'react-router-dom'
import axios from "axios"
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../layout/AuthProvider';


const notyf = new Notyf({
  position:{x:'right',y:'top'},
  dismissible : true,
  duration : 3000,
  types: [
    {
      type: 'info',
      background: 'orange',
      icon: false,
    }
  ]
});
const Register = () => {
  const a = useContext(AuthContext);
  const navigate = useNavigate();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [Imageurl,setImageurl] = useState('');
  const [password,setPassword] = useState('');
  const [Cpassword,setCPassword] = useState('');
  const [address,setAddress] = useState('');
  const [Gender,setGender] = useState('');
  const [mobile,setMobile] = useState('');
  const handleSubmit = async(e) => {
    try{
        e.preventDefault();
        if(Gender){
          if(password!==Cpassword){
            notyf.error("Oops! Your password and confirm password don't match.")
          }
          else{
            const response = await axios.post("http://localhost:3000/register",{name,email,Imageurl,password,address,Gender,mobile});
            if(response.data===1){
              notyf.success("Registered Successfully!!")
              a.login();
              setName('');
              setEmail('');
              setImageurl('');
              setCPassword('');
              setPassword('');
              setMobile('');
              setAddress('');
              setGender('');
              navigate("/");
            }
            else{
              notyf.open({
                type : 'info',
                message : "Already Registered with this Email"
              })
            }
          }
        }
        else{
          notyf.open({
            type:'info',
            message:"Please Select Specific Gender"
          })
        } 
    }
    catch(err){
        console.error(err);
    }
  }
  return (
    <div className='register'>
      <div className="box1"></div>
      <form onSubmit={handleSubmit}>
       <h1>Registration</h1>
       <input type="text" value={name} placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} required />
       <input type="email" value={email} placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} required/>
       <input type="text" value={Imageurl} placeholder='Imageurl' onChange={(e) => setImageurl(e.target.value)} required/>
       <select value={Gender} id="" onChange={(e)=>{setGender(e.target.value)}}>
         <option value="">Select Gender</option>
         <option value="Male">Male</option>
         <option value="Female">Female</option>
       </select>
       <input type="password" value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} required/>
       <input type="password" value={Cpassword} placeholder='Confirm Password' onChange={(e) => setCPassword(e.target.value)} required/>
       <input type="text" value={address} placeholder='Enter Your Address'onChange={(e) => setAddress(e.target.value)} required/>
       <input type="tel" value={mobile} placeholder="Enter your mobile number" pattern="[0-9]{10}" required onChange={(e) => setMobile(e.target.value)}/>
       <button type='submit'>Register</button>
       <h3>Already have an account? <NavLink to="/login" className="register_navlink">Sign in</NavLink></h3>
      </form>
    </div>
  )
}

export default Register

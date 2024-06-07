import React , {useState} from 'react'
import "../../public/bapply.css"
import { NavLink } from 'react-router-dom'
import axios from "axios"
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';
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
const Before_Apply = (props) => {
    const navigate = useNavigate();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [Imageurl,setImageurl] = useState('');
    const [password,setPassword] = useState('');
    const [Cpassword,setCPassword] = useState('');
    const [address,setAddress] = useState('');
    const [Gender,setGender] = useState('');
    const [mobile,setMobile] = useState('');
    const [experience,setExperience] = useState('');
    const handleSubmit = async(e) => {
      try{
          e.preventDefault();
          if(Gender){
            if(password!==Cpassword){
              notyf.error("Oops! Your password and confirm password don't match.")
            }
            else{
              const response = await axios.post("http://localhost:3000/apply-instructor",{name,email,Imageurl,password,address,Gender,mobile,experience});
              if(response.data===1){
                notyf.success("Applied Successfully!!")
                setName('');
                setEmail('');
                setImageurl('');
                setCPassword('');
                setPassword('');
                setMobile('');
                setAddress('');
                setGender('');
                setExperience('');
                props.setCk(1);
              }
              else{
                notyf.open({
                  type : 'info',
                  message : "Already Applied with this Email"
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
    <div className='apply'>
      <form onSubmit={handleSubmit}>
       <h1>Apply for Instructor Role</h1>
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
       <textarea value = {experience} cols="37" rows="3" placeholder='Enter your experience' required onChange={(e) => setExperience(e.target.value)}/>
       <button type='submit'>Apply</button>
      </form>
    </div>
  )
}

export default Before_Apply

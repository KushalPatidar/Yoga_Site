import React from 'react'
import { NavLink } from 'react-router-dom'
import "../../public/hero.css"
const Hero = () => {
  return (
    <div className='hero'>
        <h1>Welcome to Our Yoga Sanctuary</h1>
        <p>Discover the path to inner peace, strength, and serenity through the ancient practice of yoga. At AsanaVibes, we offer a haven for individuals seeking balance in mind, body, and spirit</p>
        <NavLink to="register"> <button className='btn1'>Join Us</button></NavLink>
        <NavLink to="classes"><button className='btn2'>View Course</button></NavLink> 
    </div>
  )
}

export default Hero

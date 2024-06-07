import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { AuthProvider } from './AuthProvider'

const MainLayout = () => {
  return (
    <div>
       <AuthProvider>
        <Navbar />
        <Outlet />
        <Footer />
       </AuthProvider>
    </div>
  )
}

export default MainLayout

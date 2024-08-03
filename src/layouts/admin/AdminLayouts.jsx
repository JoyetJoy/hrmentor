import React from 'react'
import Header from '../../components/admin/Header'
import Dashbord from '../../pages/admin/Dashbord'
import { Outlet } from 'react-router-dom'
import Login from '../../pages/auth/admin/Login'
import ForgotPass from '../../pages/auth/admin/ForgotPass'

function AdminLayouts() {
  return (
    <>
    
    <div className='bg-gray-100 px-14 py-4'>
        <Header/>
        <Outlet/>
        
    </div>
    </>
  )
}

export default AdminLayouts

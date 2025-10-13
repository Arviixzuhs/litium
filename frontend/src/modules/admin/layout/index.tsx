import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { AdminSidebar } from '../components/Sidebar'

export const AdminLayout = () => {
  const location = useLocation()

  React.useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <div className='flex h-screen overflow-hidden'>
      <AdminSidebar />
      <div className='flex-1 h-full w-full mx-auto p-4'>
        <Outlet />
      </div>
    </div>
  )
}

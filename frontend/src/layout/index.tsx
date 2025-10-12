import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

export const Layout = () => {
  const location = useLocation()

  React.useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <>
      <Navbar />
      <div className='max-w-5xl w-full mx-auto px-4'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

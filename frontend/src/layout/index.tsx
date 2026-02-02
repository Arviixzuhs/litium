import React from 'react'
import { Back } from '@/components/Back'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/modules/home/components/Footer'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { HeroSection } from '@/modules/home/components/Hero'

export const Layout = () => {
  const location = useLocation()

  React.useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [location])

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>
        {location.pathname === '/' && <HeroSection />}
        <div className='max-w-5xl w-full mx-auto'>
          <div className='flex flex-col gap-6 max-w-6xl w-full mx-auto py-12 pb-12 px-4'>
            {location.pathname !== '/' && <Back />}
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

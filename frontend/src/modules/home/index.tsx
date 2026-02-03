import React from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from './components/Footer'
import { OurSpecs } from './components/OurSpecs'
import { Products } from './components/Products'
import { HeroSection } from './components/Hero'
import { ProductCatalogs } from './components/ProductCatalogs'
import { ProductCarousel } from './components/ProductCarousel'
import { CategoriesMarquee } from './components/CategoriesMarquee'

interface ISection {
  children: React.ReactNode
}

const Sections = ({ children }: ISection) => {
  return (
    <div className='max-w-6xl w-full mx-auto'>
      <div className='flex flex-col gap-6 max-w-6xl w-full mx-auto p-4'>
        <div className='flex flex-col gap-12'>{children}</div>
      </div>
    </div>
  )
}

const Hero = () => {
  return (
    <div className='flex flex-col gap-6 max-w-6xl w-full mx-auto p-4'>
      <HeroSection />
      <CategoriesMarquee />
    </div>
  )
}

export const HomePage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex flex-col gap-12'>
        <Hero />
        <Sections>
          <Products />
          <ProductCatalogs />
        </Sections>
        <ProductCarousel />
        <Sections>
          <OurSpecs />
        </Sections>
      </main>
      <Footer />
    </div>
  )
}

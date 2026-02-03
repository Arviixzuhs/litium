import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const products = [
  {
    title: 'Últimos Smartphones',
    subtitle: 'Descubre tecnología móvil de vanguardia',
    image:
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Laptops',
    subtitle: 'Potencia y rendimiento para profesionales',
    image:
      'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Audifonos Inalámbricos',
    subtitle: 'Sumérgete en un sonido de alta calidad',
    image:
      'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
]

export const ProductCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)
  }

  return (
    <div className='relative h-screen overflow-hidden bg-gradient-to-br from-blue-900 to-blue-700'>
      {products.map((product, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage: `url(${product.image})`,
              filter: 'brightness(0.4)',
            }}
          />
        </div>
      ))}
      <div className='relative h-full flex items-center justify-center'>
        <div className='text-center text-white px-4 max-w-4xl'>
          <h1 className='text-5xl md:text-7xl font-bold mb-6 animate-fade-in'>
            {products[currentSlide].title}
          </h1>
          <p className='text-xl md:text-2xl mb-8 text-gray-200'>
            {products[currentSlide].subtitle}
          </p>
        </div>
      </div>
      <button
        onClick={prevSlide}
        className='cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2  text-white p-3 rounded-full transition-all backdrop-blur-sm'
      >
        <ChevronLeft className='h-6 w-6' />
      </button>
      <button
        onClick={nextSlide}
        className='cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-all backdrop-blur-sm'
      >
        <ChevronRight className='h-6 w-6' />
      </button>
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2'>
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

import React from 'react'
import { Image } from '@heroui/react'
interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export const ProductImageGallery = ({ images, productName }: ProductImageGalleryProps) => {
  const [showZoom, setShowZoom] = React.useState(false)
  const [zoomPosition, setZoomPosition] = React.useState({ x: 0, y: 0 })
  const [selectedImage, setSelectedImage] = React.useState(0)
  const imageRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  const handleTouchStart = () => {
    setShowZoom(true)
  }

  const handleTouchEnd = () => {
    setShowZoom(false)
  }

  return (
    <div className='flex flex-col lg:flex-row gap-3 md:gap-5 w-full'>
      <div className='flex lg:flex-col gap-2 order-2 lg:order-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0'>
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`flex-shrink-0 rounded-md ${selectedImage === index ? 'border-2 border-primary' : 'border-2'}`}
            aria-label={`View image ${index + 1}`}
          >
            <div className='bg-card p-2 rounded-sm'>
              <Image
                alt={productName}
                src={image}
                width={90}
                radius='sm'
                height={70}
                className={`object-contain transition-transform duration-300 group-hover:scale-105`}
              />
            </div>
          </button>
        ))}
      </div>
      <div
        ref={imageRef}
        className='relative w-full aspect-square max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto lg:mx-0 overflow-hidden rounded-lg bg-gray-100 cursor-crosshair order-1 lg:order-2'
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[selectedImage] || '/placeholder.svg'}
          alt={`${productName} - View ${selectedImage + 1}`}
          className={`w-full h-full  object-contain transition-transform duration-200 ${
            showZoom ? 'scale-150' : ''
          }`}
          style={
            showZoom
              ? {
                  transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                }
              : undefined
          }
        />
      </div>
    </div>
  )
}

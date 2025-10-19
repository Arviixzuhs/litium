import React from 'react'
import { cn } from '@heroui/theme'
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

  return (
    <div className='flex gap-5'>
      <div className='flex flex-col gap-2'>
        {images.map((image, index) => (
          <button key={index} onClick={() => setSelectedImage(index)} className={`cursor-pointer`}>
            <Image
              src={image || '/placeholder.svg'}
              alt={`${productName} - Miniatura ${index + 1}`}
              className={`object-cover w-20 h-20 rounded-md transition-all cursor-pointer ${selectedImage === index ? 'border-2 border-primary' : 'border-2'}`}
            />
          </button>
        ))}
      </div>
      <div
        ref={imageRef}
        className='relative w-96 h-96 overflow-hidden rounded-lg bg-muted cursor-crosshair'
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={images[selectedImage] || '/placeholder.svg'}
          alt={`${productName} - Vista ${selectedImage + 1}`}
          className={cn(
            'w-full h-full object-cover transition-transform duration-200',
            showZoom && 'scale-150',
          )}
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

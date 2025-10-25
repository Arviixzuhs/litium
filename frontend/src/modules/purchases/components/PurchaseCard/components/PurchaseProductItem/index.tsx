import { Image } from '@heroui/react'
import { Link } from 'react-router-dom'

interface PurchaseProductItemProps {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

export const PurchaseProductItem = ({
  id,
  name,
  price,
  image,
  quantity,
}: PurchaseProductItemProps) => (
  <div className='flex items-center gap-4'>
    <div className='relative w-16 h-16 overflow-hidden rounded-md border border-divider bg-default-100'>
      <Image src={image || '/placeholder.svg'} className='object-cover' />
    </div>
    <div className='flex flex-1 flex-col'>
      <Link to={`/product/${id}`}>
        <p className='font-medium text-primary'>{name}</p>
      </Link>
      <p className='text-sm text-default-500'>Cantidad: {quantity}</p>
      {price && <p className='text-sm text-default-500'>Precio: ${price}</p>}
    </div>
  </div>
)

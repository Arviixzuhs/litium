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
    <div className='h-15 w-15 p-2 flex justify-center items-center'>
      <Image radius='none' src={image} className='object-cover' />
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

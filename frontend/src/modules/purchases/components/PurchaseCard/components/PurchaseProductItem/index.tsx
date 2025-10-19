import { Image } from '@heroui/react'

interface PurchaseProductItemProps {
  name: string
  price: number
  image: string
  quantity: number
}

export const PurchaseProductItem = ({ quantity, name, price, image }: PurchaseProductItemProps) => (
  <div className='flex items-center gap-4'>
    <div className='relative w-16 h-16 overflow-hidden rounded-md border border-divider bg-default-100'>
      <Image src={image || '/placeholder.svg'} className='object-cover' />
    </div>
    <div className='flex flex-1 flex-col'>
      <p className='font-medium'>{name}</p>
      <p className='text-sm text-default-500'>Cantidad: {quantity}</p>
      {price && <p className='text-sm text-default-500'>Precio: ${price}</p>}
    </div>
  </div>
)

import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Card, CardBody, CardHeader, Image } from '@heroui/react'

export const Shopping = () => {
  const { cartItems } = useSelector((state: RootState) => state.shoppingCart)

  return (
    <Card
      classNames={{
        base: 'w-[500px]',
      }}
    >
      <CardHeader className='font-bold'>Compras</CardHeader>
      <CardBody>
        {cartItems.map((item, index) => (
          <li key={index} className='justify-between flex gap-2  items-center'>
            <div className='flex gap-2  items-center'>
              <div>
                <Image
                  src={'https://heroui.com/images/hero-card-complete.jpeg'}
                  alt={item.name}
                  radius='sm'
                  className='object-cover max-w-25 transition-transform duration-300 group-hover:scale-105'
                />
              </div>
              <div>
                <h3 className='font-semibold'>{item.name}</h3>
                <p className='text-gray-500 dark:text-gray-400'>${item.price}</p>
                <p className='font-bold dark:text-gray-200'>${item.totalPrice}</p>
              </div>
            </div>
          </li>
        ))}
      </CardBody>
    </Card>
  )
}

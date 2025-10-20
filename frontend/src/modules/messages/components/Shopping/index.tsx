import React from 'react'
import { useParams } from 'react-router-dom'
import { ShoppingCartModel } from '@/types/shoppingCartModel'
import { reqGetShoppingCartById } from '@/api/requests'
import { Card, CardBody, CardHeader, Image, Spinner } from '@heroui/react'

export const Shopping = () => {
  const params = useParams<{ cartId: string }>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [shoppingCart, setShoppingCart] = React.useState<ShoppingCartModel | null>(null)

  React.useEffect(() => {
    if (!params.cartId) return
    reqGetShoppingCartById(Number(params.cartId))
      .then((res) => setShoppingCart(res.data))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [params.cartId])

  if (!params.cartId) return

  return (
    <Card shadow='none' className='bg-sidebar-accent'>
      <CardHeader className='font-bold'>Compras</CardHeader>
      <CardBody>
        {isLoading && <Spinner />}
        {!isLoading &&
          shoppingCart?.products?.map((item, index) => (
            <li key={index} className='justify-between flex gap-2 items-center'>
              <div className='flex gap-2 items-center'>
                <div>
                  <Image
                    src={'https://heroui.com/images/hero-card-complete.jpeg'}
                    alt={item.product?.name}
                    radius='sm'
                    className='object-cover max-w-25 transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div>
                  <h3 className='font-semibold'>{item.product?.name}</h3>
                  <p className='text-gray-500 dark:text-gray-400'>${item.product?.price}</p>
                  <p className='font-bold dark:text-gray-200'>
                    ${item.product?.price || 0 * item.quantity} ({item.quantity})
                  </p>
                </div>
              </div>
            </li>
          ))}
      </CardBody>
    </Card>
  )
}

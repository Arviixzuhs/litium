import React from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateStatus } from '@/modules/purchases/slices/purchaseSlice'
import { reqGetShoppingCartById } from '@/api/requests'
import { ShoppingCartModel, ShoppingCartStatus } from '@/types/shoppingCartModel'
import { Button, Card, CardBody, CardHeader, Image, Spinner } from '@heroui/react'
import { reqConfirmShoppingCart, reqUpdateShoppingCartStatus } from '../../services'

export const Shopping = () => {
  const dispatch = useDispatch()
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

  const updateLocalPurchaseStatus = (status: ShoppingCartStatus) => {
    if (!shoppingCart) return
    setShoppingCart({
      ...shoppingCart,
      status,
    })
  }

  const handleConfirm = async () => {
    try {
      if (!shoppingCart) return
      await reqConfirmShoppingCart(shoppingCart?.id)
      dispatch(updateStatus({ id: shoppingCart.id, status: ShoppingCartStatus.PAID }))
      updateLocalPurchaseStatus(ShoppingCartStatus.PAID)
      toast.success('Carrito confirmado correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = async () => {
    try {
      if (!shoppingCart) return
      await reqUpdateShoppingCartStatus(shoppingCart?.id, ShoppingCartStatus.CANCELED)
      dispatch(updateStatus({ id: shoppingCart.id, status: ShoppingCartStatus.CANCELED }))
      updateLocalPurchaseStatus(ShoppingCartStatus.CANCELED)
      toast.success('Carrito cancelado correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
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
                      ${item.product?.price * item.quantity} ({item.quantity})
                    </p>
                  </div>
                </div>
              </li>
            ))}
        </CardBody>
      </Card>
      {shoppingCart?.status === ShoppingCartStatus.PENDING && (
        <div className='flex w-full gap-2'>
          <Button size='sm' color='danger' variant='flat' onPress={handleCancel}>
            Cancelar compra
          </Button>
          <Button size='sm' color='success' variant='flat' onPress={handleConfirm}>
            Confirmar compra
          </Button>
        </div>
      )}
    </div>
  )
}

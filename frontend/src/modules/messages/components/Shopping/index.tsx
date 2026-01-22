import React from 'react'
import toast from 'react-hot-toast'
import { socket } from '@/api/socket'
import { RootState } from '@/store'
import { useParams } from 'react-router-dom'
import { updateStatus } from '@/modules/purchases/slices/purchaseSlice'
import { reqGetShoppingCartById } from '@/api/requests'
import { useDispatch, useSelector } from 'react-redux'
import { CheckPermissionByComponent } from '@/components/CheckPermissionByComponent'
import {
  DeliveryMethodModel,
  PaymentMethodModel,
  ShoppingCartModel,
  ShoppingCartStatus,
} from '@/types/shoppingCartModel'
import { Button, Card, CardBody, Image, Spinner } from '@heroui/react'
import { reqConfirmShoppingCart, reqUpdateShoppingCartStatus } from '../../services'

interface ShoppingInterface {
  hiddeActios?: boolean
  showDetails?: boolean
}

export const DeliveryMethodLabels: Record<DeliveryMethodModel, string> = {
  [DeliveryMethodModel.AGENCY_PICKUP]: 'Retiro en agencia',
  [DeliveryMethodModel.HOME_DELIVERY]: 'Entrega a domicilio',
  [DeliveryMethodModel.STORE_PICKUP]: 'Retiro en tienda',
}

export const PaymentMethodLabels: Record<PaymentMethodModel, string> = {
  [PaymentMethodModel.MOBILE_PAYMENT]: 'Pago móvil',
  [PaymentMethodModel.TRANSFER]: 'Transferencia',
}

export const Shopping = ({ hiddeActios = false, showDetails = false }: ShoppingInterface) => {
  const dispatch = useDispatch()
  const params = useParams<{ cartId: string }>()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [shoppingCart, setShoppingCart] = React.useState<ShoppingCartModel | null>(null)
  const chat = useSelector((state: RootState) => state.chat)

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
      const response = await reqConfirmShoppingCart(shoppingCart?.id)
      socket.emit('confirm', { invoiceId: response.data.id, cartId: Number(params.cartId) })
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
      toast.success('Carrito cancelado correctamente')
    } catch (error) {
      console.log(error)
    }
  }

  const ShoppingCartDetails = () => {
    if (!shoppingCart) return null

    return (
      <div className='flex flex-col gap-4'>
        {shoppingCart.delivery?.recipient && (
          <Card shadow='none'>
            <CardBody>
              <h3 className='font-semibold mb-2'>Destinatario</h3>
              <p>
                {shoppingCart.delivery.recipient.firstName}{' '}
                {shoppingCart.delivery.recipient.lastName}
              </p>
              <p>Télefono: {shoppingCart.delivery.recipient.phone}</p>
              <p>Cédula: {shoppingCart.delivery.recipient.documentId}</p>
            </CardBody>
          </Card>
        )}
        {shoppingCart.delivery && (
          <Card shadow='none'>
            <CardBody>
              <h3 className='font-semibold mb-2'>Envio</h3>
              <p>Método: {DeliveryMethodLabels[shoppingCart.delivery.method]}</p>
              <p>Agencia: {shoppingCart.delivery.agency}</p>
              {shoppingCart.delivery.address && (
                <>
                  <p>Estado: {shoppingCart.delivery.address.state}</p>
                  <p>Ciudad: {shoppingCart.delivery.address.city}</p>
                  <p>Dirección: {shoppingCart.delivery.address.addressLine}</p>
                  <p>Punto de referencia: {shoppingCart.delivery.address.referencePoint}</p>
                </>
              )}
            </CardBody>
          </Card>
        )}
        {shoppingCart.payment && (
          <Card shadow='none'>
            <CardBody>
              <h3 className='font-semibold mb-2'>Pago</h3>
              <p>Metodo: {PaymentMethodLabels[shoppingCart.payment.method]}</p>
              <p>Referencia: {shoppingCart.payment.reference}</p>
              <p>Monto: ${shoppingCart.payment.amount}</p>
              <p>Fecha: {new Date(shoppingCart.payment.paymentDate).toLocaleString()}</p>
              {shoppingCart.payment.imageUrl && (
                <Image
                  src={shoppingCart.payment.imageUrl}
                  alt='Comprobante de pago'
                  radius='sm'
                  className='w-40 h-40 object-cover mt-2'
                />
              )}
            </CardBody>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-2'>
      <Card shadow='none' className='bg-sidebar-accent'>
        <CardBody>
          {isLoading && <Spinner />}
          {!isLoading && (
            <div className='flex flex-col gap-2'>
              {shoppingCart?.products?.map((item, index) => (
                <li key={index} className='justify-between flex gap-2 items-center'>
                  <div className='flex gap-2 items-center'>
                    <div className='bg-muted-2 rounded-sm'>
                      <Image
                        src={item.product?.images?.[0]?.imageURL || ''}
                        alt={item.product?.name}
                        radius='sm'
                        className='object-cover w-25 h-20 transition-transform duration-300 group-hover:scale-105'
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
            </div>
          )}
        </CardBody>
      </Card>
      {shoppingCart?.status === ShoppingCartStatus.PENDING && !chat.invoiceId && !hiddeActios && (
        <div className='flex w-full gap-2'>
          <Button size='sm' color='danger' variant='flat' onPress={handleCancel}>
            Cancelar compra
          </Button>
          <CheckPermissionByComponent permission={'*'} mode='remove'>
            <Button size='sm' color='success' variant='flat' onPress={handleConfirm}>
              Confirmar compra
            </Button>
          </CheckPermissionByComponent>
        </div>
      )}
      {showDetails && <ShoppingCartDetails />}
    </div>
  )
}

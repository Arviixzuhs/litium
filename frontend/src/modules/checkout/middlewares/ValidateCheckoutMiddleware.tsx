import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ShoppingCartModel } from '@/types/shoppingCartModel'
import { useNumericParamGuard } from '@/hooks/useNumericParam'
import { reqGetShoppingCartById } from '@/api/requests'

export const ValidateCheckoutMiddleware = () => {
  const cartId = useNumericParamGuard('cartId')
  const [shoppingCart, setShoppingCart] = React.useState<ShoppingCartModel | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    if (!cartId) return
    reqGetShoppingCartById(Number(cartId))
      .then((res) => setShoppingCart(res.data))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [cartId])

  if (isLoading) return null

  if (!shoppingCart || (shoppingCart?.payment && shoppingCart?.delivery)) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

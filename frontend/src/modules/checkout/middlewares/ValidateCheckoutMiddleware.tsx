import React from 'react'
import { useParams } from 'react-router-dom'
import { Navigate, Outlet } from 'react-router-dom'
import { ShoppingCartModel } from '@/types/shoppingCartModel'
import { reqGetShoppingCartById } from '@/api/requests'

export const ValidateCheckoutMiddleware = () => {
  const params = useParams<{ cartId: string }>()
  const [shoppingCart, setShoppingCart] = React.useState<ShoppingCartModel | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    if (!params.cartId) return

    reqGetShoppingCartById(Number(params.cartId))
      .then((res) => setShoppingCart(res.data))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [params.cartId])

  if (isLoading) return null

  if (!shoppingCart || (shoppingCart?.payment && shoppingCart?.delivery)) {
    return <Navigate to='/' replace />
  }

  return <Outlet />
}

import { ShoppingCartProductModel } from '@/types/shoppingCartModel'

export const calcTotalByPurchaseProducts = (purchaseProducts: ShoppingCartProductModel[]) => {
  return (
    purchaseProducts?.reduce((acc, item) => {
      const price = item.product?.price || 0
      const quantity = item.quantity || 0
      return acc + price * quantity
    }, 0) || 0
  )
}

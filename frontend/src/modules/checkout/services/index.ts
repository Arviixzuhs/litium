import { api } from '@/api/axios'
import { CheckoutData } from '@/types/checkoutModel'
import { ShoppingCartModel } from '@/types/shoppingCartModel'

const createCheckoutFormData = (data: CheckoutData, file?: File) => {
  const formData = new FormData()

  // stringify de objetos anidados
  formData.append('recipient', JSON.stringify(data.recipient))
  formData.append('delivery', JSON.stringify(data.delivery))
  formData.append('payment', JSON.stringify(data.payment))

  // archivo único
  if (file) {
    formData.append('image', file)
  }

  return formData
}

export const reqCheckoutShoppingCart = (
  shoppingCartId: number,
  data: CheckoutData,
  file?: File,
) => {
  const formData = createCheckoutFormData(data, file)
  return api.put<ShoppingCartModel>(`/shopping-cart/${shoppingCartId}/checkout`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

import { api } from '@/api/axios'
import { MessageModel } from '@/types/messageModal'
import { ShoppingCartStatus } from '@/types/shoppingCartModel'

export const reqGetMessagesByCartId = (cartId: number) =>
  api.get<MessageModel[]>(`/messages/cart/${cartId}`)
export const reqConfirmShoppingCart = (cartId: number) =>
  api.post(`/shopping-cart/${cartId}/confirm`)
export const reqUpdateShoppingCartStatus = (cartId: number, status: ShoppingCartStatus) =>
  api.patch(`/shopping-cart/${cartId}?status=${status}`)

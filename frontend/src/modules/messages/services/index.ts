import { api } from '@/api/axios'
import { MessageModel } from '@/types/messageModal'

export const reqGetMessagesByCartId = (cartId: number) =>
  api.get<MessageModel[]>(`/messages/cart/${cartId}`)

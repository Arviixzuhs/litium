import { ShoppingCartModel } from './shoppingCartModel'
import { UserModel } from './userModel'

export interface MessageModel {
  id: number
  seen?: boolean
  userId: number
  message: string
  senderId: number
  isEdited?: boolean
  isDeleted?: boolean
  deletedAt?: string | null
  editedAt?: string | null
  createdAt: string
  shoppingCartId: number

  // Relaciones
  user?: UserModel
  sender?: UserModel
  shoppingCart?: ShoppingCartModel
}

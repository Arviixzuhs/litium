import { UserModel } from './userModel'
import { ShoppingCartProduct } from './shoppingCartModel'

export interface InvoiceModel {
  id: number
  rif?: string | null
  name: string
  phone?: string | null
  total?: number | null
  address?: string | null
  sellerId: number
  isDeleted?: boolean
  deletedAt?: Date | null
  createdAt: Date

  // Relaciones
  seller?: UserModel
  products?: ShoppingCartProduct[]
}

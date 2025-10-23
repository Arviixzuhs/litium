import { UserModel } from './userModel'
import { ShoppingCartProductModel } from './shoppingCartModel'

export interface InvoiceModel {
  id: number
  rif?: string
  name: string
  phone?: string
  total?: number
  address?: string
  sellerId: number

  seller: UserModel
  isDeleted?: boolean
  deletedAt?: Date
  createdAt: Date
  buyerName: string
  sellerName: string

  products: ShoppingCartProductModel[]
}

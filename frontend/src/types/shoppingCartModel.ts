import { InvoiceModel } from './invoiceModel'
import { MessageModel } from './messageModal'
import { ProductModel } from './productModel'
import { UserModel } from './userModel'

export enum ShoppingCartStatus {
  PAID = 'PAID',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
}

export interface ShoppingCartProductModel {
  id: number
  quantity: number
  invoiceId?: number | null
  productId: number
  shoppingCartId: number
  createdAt: Date

  product: ProductModel
  invoice?: InvoiceModel
  shoppingCart?: ShoppingCartModel
}

export interface ShoppingCartModel {
  id: number
  name: string
  userId: number
  status: ShoppingCartStatus
  isDeleted?: boolean
  deletedAt?: Date | null
  createdAt: string

  // Relaciones
  user?: UserModel
  products?: ShoppingCartProductModel[]
  messages?: MessageModel[]
}

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
  productId: number
  shoppingCartId: number
  createdAt: Date

  product: ProductModel
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
  invoice?: InvoiceModel
  products?: ShoppingCartProductModel[]
  messages?: MessageModel[]
  payment?: PaymentModel
  delivery?: DeliveryModel
}

export enum PaymentMethodModel {
  TRANSFER = 'TRANSFER',
  MOBILE_PAYMENT = 'MOBILE_PAYMENT',
}

export enum DeliveryMethodModel {
  AGENCY_PICKUP = 'AGENCY_PICKUP',
  HOME_DELIVERY = 'HOME_DELIVERY',
  STORE_PICKUP = 'STORE_PICKUP',
}

export enum DeliveryAgencyModel {
  MRW = 'MRW',
  ZOOM = 'ZOOM',
}

export interface PaymentModel {
  id: number
  imageUrl: string
  method: PaymentMethodModel
  reference: string
  amount: number
  paymentDate: string
  createdAt: string
  shoppingCarts?: ShoppingCartModel[]
}

export interface RecipientModel {
  id: number
  firstName: string
  lastName: string
  phone: string
  documentId: string
  deliveries?: DeliveryModel[]
}

export interface DeliveryAddressModel {
  id: number
  state: string
  city: string
  addressLine: string
  referencePoint: string
  deliveries?: DeliveryModel[]
}

export interface DeliveryModel {
  id: number
  method: DeliveryMethodModel
  agency: DeliveryAgencyModel
  addressId: number
  recipientId: number
  address: DeliveryAddressModel
  recipient: RecipientModel
  createdAt: string
  shoppingCarts?: ShoppingCartModel[]
}

export type DeliveryMethod = 'AGENCY_PICKUP' | 'HOME_DELIVERY' | 'STORE_PICKUP'
export type DeliveryAgency = 'MRW' | 'ZOOM'
export type PaymentMethod = 'TRANSFER' | 'MOBILE_PAYMENT'

export interface Recipient {
  firstName: string
  lastName: string
  phone: string
  documentId: string
}

export interface DeliveryAddress {
  state: string
  city: string
  addressLine: string
  referencePoint: string
}

export interface DeliveryInfo {
  method: DeliveryMethod | null
  agency: DeliveryAgency | null
  address: DeliveryAddress
}

export interface PaymentInfo {
  method: PaymentMethod | null
  reference: string
  amount: string
  paymentDate: string
}

export interface CheckoutData {
  recipient: Recipient
  delivery: DeliveryInfo
  payment: PaymentInfo
}

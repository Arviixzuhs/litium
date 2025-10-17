export interface ShoppingCartProduct {
  productId: number
  quantity: number
}

export interface ReqCreateShoppingCart {
  name: string
  products: ShoppingCartProduct[]
}

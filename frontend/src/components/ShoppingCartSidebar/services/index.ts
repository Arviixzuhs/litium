import { api } from '@/api/axios'
import { ReqCreateShoppingCart } from './interfaces'
import { ShoppingCartProductModel } from '@/types/shoppingCartModel'

export const reqCreateShoppingCart = (data: ReqCreateShoppingCart) =>
  api.post<ShoppingCartProductModel>('/shopping-cart', data)

import { ShoppingCartModel } from '@/types/shoppingCartModel'
import { api } from './axios'

export const reqAuthLoadProfileByToken = async (token: string) =>
  api.get('/auth/load/profile/' + token)

// Rutas de carrito de compras
export const reqGetShoppingCartById = (cartId: number) =>
  api.get<ShoppingCartModel>(`/shopping-cart/${cartId}`)

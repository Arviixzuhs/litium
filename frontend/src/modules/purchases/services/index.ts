import { api } from '@/api/axios'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ShoppingCartModel } from '@/types/shoppingCartModel'
import { ReqGetShoppingCartParams } from './interfaces'

export const reqGetShoppingCart = (params: ReqGetShoppingCartParams) =>
  api.get<PaginatedResponse<ShoppingCartModel>>(`/shopping-cart`, { params })

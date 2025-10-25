import { QueryParams } from '@/api/interfaces'

export interface ReqGetShoppingCartParams extends QueryParams {
  productName?: string
  mine?: boolean
}

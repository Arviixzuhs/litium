import { QueryParams } from '@/api/interfaces'

export interface ReqGetShoppingCartParams extends QueryParams {
  mine?: boolean
  productName?: string
  searchValue?: string
}

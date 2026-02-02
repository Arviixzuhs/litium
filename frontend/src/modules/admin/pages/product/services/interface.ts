import { QueryParams } from '@/api/interfaces'

export interface ReqGetProductParams extends QueryParams {
  name?: string
  show?: string
  toDate?: string
  minPrice?: string
  maxPrice?: string
  category?: string
  fromDate?: string
  catalogId?: number
  categoryIds?: number[]
  excludeCatalogId?: string
}

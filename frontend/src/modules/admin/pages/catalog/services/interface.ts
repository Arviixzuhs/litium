import { QueryParams } from '@/api/interfaces'

export interface ReqGetCatalogParams extends QueryParams {
  name?: string
  description?: string
}

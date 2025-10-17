import { QueryParams } from '@/api/interfaces'

export interface ReqGetSupplierParams extends QueryParams {
  name?: string
  phone?: string
  email?: string
  address?: string
}

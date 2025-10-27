import { QueryParams } from '@/api/interfaces'

export interface ReqGetSupplierParams extends QueryParams {
  name?: string
  phone?: string
  email?: string
  address?: string
}

export interface ReqGetSalesParams extends QueryParams {
  id?: number
  searchValue?: string
  rif?: string
  phone?: string
  sellerId?: number
  productId?: number
  minTotal?: number
  maxTotal?: number
  fromDate?: string
  toDate?: string
}

export interface ReqDownloadSalesReportParams {
  fromDate?: string
  toDate?: string
}

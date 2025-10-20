import { api } from '@/api/axios'
import { InvoiceModel } from '@/types/invoiceModel'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ReqGetSalesParams } from './interface'

export const reqGetInvoices = (params?: ReqGetSalesParams) =>
  api.get<PaginatedResponse<InvoiceModel>>('/invoice', { params })

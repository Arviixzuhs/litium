import { api } from '@/api/axios'
import { SupplierModel } from '@/types/supplierModel'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ReqGetSupplierParams } from './interface'

export const reqGetSuppliers = (params?: ReqGetSupplierParams) =>
  api.get<PaginatedResponse<SupplierModel>>('/supplier', { params })
export const reqCreateSupplier = (data: Partial<SupplierModel>) => api.post('/supplier', data)
export const reqUpdateSupplier = (id: number, data: Partial<SupplierModel>) =>
  api.patch(`/supplier/${id}`, data)
export const reqDeleteSupplier = (id: number) => api.delete(`/supplier/${id}`)

import { api } from '@/api/axios'
import { ProductModel } from '@/types/productModel'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ReqGetProductParams } from './interface'

export const reqGetProducts = (params?: ReqGetProductParams) =>
  api.get<PaginatedResponse<ProductModel>>('/product', { params })
export const reqCreateProduct = (data: Partial<ProductModel>) => api.post('/product', data)
export const reqUpdateProduct = (id: number, data: Partial<ProductModel>) =>
  api.patch(`/product/${id}`, data)
export const reqDeleteProduct = (id: number) => api.delete(`/product/${id}`)
export const reqGetProductById = (id: number) => api.get<ProductModel>(`/product/${id}`)

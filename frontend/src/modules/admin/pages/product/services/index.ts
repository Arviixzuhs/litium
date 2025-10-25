import { api } from '@/api/axios'
import { buildFormData } from '@/utils/buildFormData'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ReqGetProductParams } from './interface'
import { ProductModel, ProductDto } from '@/types/productModel'

export const reqGetProducts = (params?: ReqGetProductParams) =>
  api.get<PaginatedResponse<ProductModel>>('/product', { params })
export const reqCreateProduct = (data: Partial<ProductDto>, images?: FormData) => {
  const formData = buildFormData(data, images)
  return api.post('/product', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const reqUpdateProduct = (
  id: number,
  data: Partial<ProductDto>,
  images?: FormData,
  existingImageURLs?: string[],
) => {
  const formData = buildFormData(data, images)
  if (existingImageURLs && existingImageURLs.length > 0) {
    existingImageURLs.forEach((url) => formData.append('existingImageURLs[]', url))
  }
  return api.patch(`/product/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}

export const reqDeleteProduct = (id: number) => api.delete(`/product/${id}`)
export const reqGetProductById = (id: number) => api.get<ProductModel>(`/product/${id}`)

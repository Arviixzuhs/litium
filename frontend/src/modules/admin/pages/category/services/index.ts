import { api } from '@/api/axios'
import { CategoryModel } from '@/types/categoryModel'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ReqGetCategoryParams } from './interface'

export const reqGetCategories = (params?: ReqGetCategoryParams) =>
  api.get<PaginatedResponse<CategoryModel>>('/category', { params })
export const reqCreateCategory = (data: Partial<CategoryModel>) => api.post('/category', data)
export const reqUpdateCategory = (id: number, data: Partial<CategoryModel>) =>
  api.put(`/category/${id}`, data)
export const reqDeleteCategory = (id: number) => api.delete(`/category/${id}`)

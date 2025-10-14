import { api } from '@/api/axios'
import { CatalogModel } from '@/types/catalogModel'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ReqGetCatalogParams } from './interface'

export const reqGetCatalogs = (params?: ReqGetCatalogParams) =>
  api.get<PaginatedResponse<CatalogModel>>('/catalog', { params })
export const reqCreateCatalog = (data: Partial<CatalogModel>) => api.post('/catalog', data)
export const reqUpdateCatalog = (id: number, data: Partial<CatalogModel>) =>
  api.patch(`/catalog/${id}`, data)
export const reqDeleteCatalog = (id: number) => api.delete(`/catalog/${id}`)

import { api } from '@/api/axios'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ReqGetCatalogParams } from './interface'
import { CatalogModel, CatalogDto } from '@/types/catalogModel'

export const reqGetCatalogs = (params?: ReqGetCatalogParams) =>
  api.get<PaginatedResponse<CatalogModel>>('/catalog', { params })
export const reqCreateCatalog = (data: CatalogDto) => api.post('/catalog', data)
export const reqUpdateCatalog = (id: number, data: Partial<CatalogDto>) =>
  api.patch(`/catalog/${id}`, data)
export const reqDeleteCatalog = (id: number) => api.delete(`/catalog/${id}`)

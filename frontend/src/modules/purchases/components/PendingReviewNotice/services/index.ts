import { api } from '@/api/axios'

export const reqGindUnreviewedProductsCount = () =>
  api.get<{ count: number }>('/product/pending-comments/count')

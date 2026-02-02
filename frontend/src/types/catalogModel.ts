export interface CatalogModel {
  id: number
  name: string
  createdAt?: string
  updatedAt?: string
  productCount: number
  description?: string | null
}

export interface CatalogDto extends Partial<CatalogModel> {
  productIds: number[]
}

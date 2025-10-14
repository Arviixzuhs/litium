export interface CatalogModel {
  id: number
  name: string
  isDeleted: boolean
  deletedAt?: string | null
  description?: string | null
}

export interface SupplierModel {
  id: number
  name: string
  phone?: string | null
  email?: string | null
  address?: string | null
  isDeleted?: boolean | null
  deletedAt?: string | null
}

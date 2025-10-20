import { CategoryModel } from './categoryModel'
import { SupplierModel } from './supplierModel'

export interface ProductModel {
  id: number
  name: string
  show?: string | null
  stock: number
  image?: string | null
  price: number
  catalogId?: number | null
  createdAt?: string | null
  updatedAt?: string | null
  deletedAt?: string | null
  isDeleted?: boolean | null
  description?: string | null
  commentsCount: number
  qualification: number

  // Relaciones
  images?: ImageProductModel[]
  suppliers: SupplierModel[]
  categories: CategoryModel[]
  specifications?: ProductSpecificationModel[]
}

export interface ProductDto extends ProductModel {
  categoryIds: number[]
  supplierIds: number[]
}

export interface ProductSpecificationModel {
  id: number
  title: string
  value: string
  productId: number
  product?: ProductModel
}

export interface ImageProductModel {
  id: number
  productId: number
  product?: ProductModel
  imageURL: string
  createdAt: string
}

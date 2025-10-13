export interface ProductImageModel {
  id: number
  imageURL: string
  createdAt: string
}

export interface ProductModel {
  id: number
  name: string
  show?: string | null
  stock?: number | null
  image?: string | null
  price?: number | null
  catalogId?: number | null
  createdAt: string
  updatedAt?: string | null
  deletedAt?: string | null
  isDeleted: boolean
  description?: string | null
  images: ProductImageModel[]

  // TODO: por definir
  specs: { label: string; value: string }[]
  rating: number
  reviews: number
  inStock: boolean
}

export interface ProductModel {
  id: string
  name: string
  price: number
  category: string
  description: string
  images: string[]
  specs: { label: string; value: string }[]
  rating: number
  reviews: number
  inStock: boolean
}

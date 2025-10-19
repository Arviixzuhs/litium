import { ProductCard } from '../ProductCard'
import { ProductModel } from '@/types/productModel'

interface ProductGridProps {
  products: ProductModel[]
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

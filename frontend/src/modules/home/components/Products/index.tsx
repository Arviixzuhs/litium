import { SearchInput } from '@/components/SearchInput'
import { ProductGrid } from './components/ProductGrid'
import { ProductCategories } from '@/modules/product/components/productCategories'
import { useProductsSearch } from './hooks/useProductsSearch'

export const Products = () => {
  const { products, searchQuery, setSearchQuery } = useProductsSearch()

  return (
    <div className='flex gap-4 flex-col'>
      <SearchInput onChange={setSearchQuery} searchValue={searchQuery} />
      <ProductCategories />
      <ProductGrid products={products} />
    </div>
  )
}

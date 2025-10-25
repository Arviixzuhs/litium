import { SearchInput } from '@/components/SearchInput'
import { reqGetProducts } from '@/modules/admin/pages/product/services'
import { ProductCategories } from '@/modules/product/components/productCategories'
import { ProductModel } from '@/types/productModel'
import React from 'react'
import { useDebounce } from 'use-debounce'
import { ProductGrid } from './components/ProductGrid'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const Products = () => {
  const [products, setProducts] = React.useState<ProductModel[]>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [debounceValue] = useDebounce(searchQuery, 100)
  const selectedCategories = useSelector((state: RootState) => state.home.selectedCategories)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetProducts({
          name: debounceValue,
          page: 0,
          size: 50,
          categoryIds: selectedCategories,
        })
        setProducts(response.data.content)
      } catch (error) {
        console.error(error)
      }
    }
    loadData()
  }, [debounceValue, selectedCategories])

  return (
    <div className='flex gap-4 flex-col'>
      <SearchInput onChange={setSearchQuery} searchValue={searchQuery} />
      <ProductCategories />
      <ProductGrid products={products} />
    </div>
  )
}

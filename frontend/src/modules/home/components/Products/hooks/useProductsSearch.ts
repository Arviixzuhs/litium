import React from 'react'
import { useDebounce } from 'use-debounce'
import { ProductModel } from '@/types/productModel'
import { reqGetProducts } from '@/modules/admin/pages/product/services'

export function useProductsSearch() {
  const [products, setProducts] = React.useState<ProductModel[]>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [debounceValue] = useDebounce(searchQuery, 100)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetProducts({ name: debounceValue, page: 0, size: 50 })
        setProducts(response.data.content)
      } catch (error) {
        console.error(error)
      }
    }
    loadData()
  }, [debounceValue])

  return { products, searchQuery, setSearchQuery }
}

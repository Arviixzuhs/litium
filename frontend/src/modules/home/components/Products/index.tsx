import React from 'react'
import { Input } from '@heroui/react'
import { Search } from 'lucide-react'
import { ProductCard } from '../ProductCard'
import { useDebounce } from 'use-debounce'
import { ProductModel } from '@/types/productModel'
import { reqGetProducts } from '@/modules/admin/pages/product/services'
import { ProductCategories } from '@/modules/product/components/productCategories'

export const Products = () => {
  const [products, setProducts] = React.useState<ProductModel[]>([])
  const [searchQuery, setSearchQuery] = React.useState('')
  const [debounceValue] = useDebounce(searchQuery, 100)

  const loadData = async () => {
    try {
      const response = await reqGetProducts({
        name: debounceValue,
        page: 0,
        size: 50,
      })
      setProducts(response.data.content)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [debounceValue])

  return (
    <div className='flex gap-4 flex-col'>
      <Input
        type='search'
        startContent={<Search />}
        placeholder='Buscar productos...'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ProductCategories />
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

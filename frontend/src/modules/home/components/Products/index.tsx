import React from 'react'
import { Input } from '@heroui/react'
import { Search } from 'lucide-react'
import { products } from './products-mock'
import { ProductCard } from '../ProductCard'
import { ProductCategories } from '@/modules/product/components/productCategories'

export const Products = () => {
  const [searchQuery, setSearchQuery] = React.useState('')

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
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

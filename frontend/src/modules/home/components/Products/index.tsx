import React from 'react'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { ProductGrid } from './components/ProductGrid'
import { useSelector } from 'react-redux'
import { ProductModel } from '@/types/productModel'
import { SectionTitle } from '@/components/SectionTitle'
import { reqGetProducts } from '@/modules/admin/pages/product/services'

export const Products = () => {
  const [products, setProducts] = React.useState<ProductModel[]>([])
  const [searchQuery, _setSearchQuery] = React.useState('')
  const [debounceValue] = useDebounce(searchQuery, 100)
  const selectedCategories = useSelector((state: RootState) => state.home.selectedCategories)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const response = await reqGetProducts({
          name: debounceValue,
          page: 0,
          size: 9,
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
    <section className='flex gap-4 flex-col'>
      <SectionTitle
        title={
          <>
            Productos <span className='text-primary'>destacados</span>
          </>
        }
        description={'Explora nuestros productos destacados y encuentra exactamente lo que buscas'}
      />
      <ProductGrid products={products} />
    </section>
  )
}

import React from 'react'
import { ProductGrid } from '@/modules/home/components/Products/components/ProductGrid'
import { ProductModel } from '@/types/productModel'
import { reqGetProducts } from '@/modules/admin/pages/product/services'
import { CategoryModel } from '@/types/categoryModel'
import { SectionTitle } from '@/components/SectionTitle'

interface RelatedProductsInterface {
  productCategories: CategoryModel[]
}

export const RelatedProducts = ({ productCategories }: RelatedProductsInterface) => {
  const [products, setProducts] = React.useState<ProductModel[]>([])

  React.useEffect(() => {
    if (!productCategories) return
    const loadData = async () => {
      try {
        const response = await reqGetProducts({
          page: 0,
          size: 6,
          categoryIds: productCategories.map((item) => item.id),
        })

        setProducts(response.data.content)
      } catch (error) {
        console.error(error)
      }
    }
    loadData()
  }, [productCategories])

  return (
    <div className='flex flex-col gap-4'>
      <SectionTitle
        title={
          <>
            Productos <span className='text-primary'>relacionados</span>
          </>
        }
        description={'Explora productos relacionados y encuentra exactamente lo que buscas'}
      />
      <ProductGrid products={products} />
    </div>
  )
}

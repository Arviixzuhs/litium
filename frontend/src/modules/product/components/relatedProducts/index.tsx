import React from 'react'
import { ProductGrid } from '@/modules/home/components/Products/components/ProductGrid'
import { ProductModel } from '@/types/productModel'
import { reqGetProducts } from '@/modules/admin/pages/product/services'
import { CategoryModel } from '@/types/categoryModel'

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
        console.log(response.data)
        setProducts(response.data.content)
      } catch (error) {
        console.error(error)
      }
    }
    loadData()
  }, [productCategories])

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='mb-2 text-2xl font-bold'>Quienes compraron este producto también compraron</h2>
      <ProductGrid products={products} />
    </div>
  )
}

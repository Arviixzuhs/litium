import React from 'react'
import { Spinner } from '@heroui/react'
import { ProductGrid } from '@/modules/home/components/Products/components/ProductGrid'
import { CatalogModel } from '@/types/catalogModel'
import { ProductModel } from '@/types/productModel'
import { SectionTitle } from '@/components/SectionTitle'
import { reqGetProducts } from '@/modules/admin/pages/product/services'
import { reqGetCatalogById } from '@/modules/admin/pages/catalog/services'
import { useNumericParamGuard } from '@/hooks/useNumericParam'

export const CatalogPage = () => {
  const [catalog, setCatalog] = React.useState<CatalogModel | null>(null)
  const [products, setProducts] = React.useState<ProductModel[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const catalogId = useNumericParamGuard('catalogId')

  const loadProducts = async () => {
    if (!catalogId) return
    try {
      setIsLoading(true)
      const response = await reqGetProducts({
        page: 0,
        size: 99,
        catalogId,
      })

      setProducts(response.data.content)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadCatalog = async () => {
    try {
      if (!catalogId) return
      const response = await reqGetCatalogById(Number(catalogId))
      setCatalog(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    loadProducts()
    loadCatalog()
  }, [])

  return (
    <section className='flex gap-4 flex-col'>
      {isLoading && <Spinner />}
      {!isLoading && catalog !== null && (
        <>
          <SectionTitle
            title={
              <>
                Productos del catálogo <span className='text-primary'>{catalog?.name}</span>
              </>
            }
            description={'Explora nuestros productos y encuentra exactamente lo que buscas'}
          />
          <ProductGrid products={products} />
        </>
      )}
    </section>
  )
}

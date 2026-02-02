import React from 'react'
import toast from 'react-hot-toast'
import { StarRating } from './components/starRating'
import { useDispatch } from 'react-redux'
import { ProductSpecs } from './components/productSpecs'
import { ProductStock } from '../home/components/Products/components/ProductCard/components/ProductStock'
import { ShareDropdown } from './components/shareDropdown'
import { addItemToCart } from '@/features/shoppingCartSlice'
import { ProductComment } from './components/productComment'
import { RelatedProducts } from './components/relatedProducts'
import { reqGetProductById } from '../admin/pages/product/services'
import type { ProductModel } from '@/types/productModel'
import { ProductImageGallery } from './components/productGallery'
import { useNumericParamGuard } from '@/hooks/useNumericParam'
import { Button, Divider, Spinner } from '@heroui/react'
import { ShieldCheck, ShoppingCart, Truck } from 'lucide-react'

export const ProductPage = () => {
  const productId = useNumericParamGuard('productId')
  const [product, setProduct] = React.useState<ProductModel | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (!productId) return
    setIsLoading(true)
    reqGetProductById(Number(productId))
      .then((res) => setProduct(res.data))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.imageURL || '',
        quantity: 1,
        totalPrice: product.price,
      }),
    )
    toast.success('Producto agregado al carrito')
  }

  if (!product || isLoading) return <Spinner />

  return (
    <section className='flex gap-12 flex-col'>
      <div className='grid gap-8 lg:grid-cols-2'>
        <div>
          <ProductImageGallery
            images={product.images?.map((item) => item.imageURL) || []}
            productName={product.name}
          />
        </div>
        <div className='space-y-6'>
          <div>
            <h1 className='mb-2 text-balance text-3xl font-bold md:text-4xl'>{product.name}</h1>
            <div className='mb-4 flex items-center gap-2'>
              <StarRating rating={product.qualification} size={20} />
              <span className='font-medium'>{product.qualification?.toFixed(1)}</span>
              <span className='text-muted-foreground'>
                ({product.commentsCount}{' '}
                {product.commentsCount === 1 ? 'comentario' : 'comentarios'})
              </span>
            </div>
            <div className='mb-6'>
              <span className='text-4xl font-bold'>${product.price.toLocaleString()}</span>
            </div>
            <ProductStock stock={product.stock} />
            <p className='mb-6 text-pretty leading-relaxed text-muted-foreground'>
              {product.description}
            </p>
            <div className='flex flex-col sm:flex-row gap-3 w-full'>
              <div className='w-full'>
                <Button
                  size='lg'
                  color='primary'
                  radius='sm'
                  className='flex-1 gap-2 w-full'
                  onPress={handleAddToCart}
                  disabled={false}
                >
                  <ShoppingCart className='h-5 w-5' />
                  Agregar al carrito
                </Button>
              </div>
              <div className='w-full'>
                <ShareDropdown />
              </div>
            </div>
          </div>
          <Divider />
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <Truck className='h-6 w-6 flex-shrink-0 text-accent' />
              <div>
                <h4 className='font-semibold'>Envío gratis</h4>
                <p className='text-sm text-muted-foreground'>En compras superiores a $500</p>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <ShieldCheck className='h-6 w-6 flex-shrink-0 text-accent' />
              <div>
                <h4 className='font-semibold'>Garantía extendida</h4>
                <p className='text-sm text-muted-foreground'>2 años de cobertura completa</p>
              </div>
            </div>
          </div>
          <Divider />
          <ProductSpecs specs={product.specifications || []} />
        </div>
      </div>
      <ProductComment />
      <RelatedProducts productCategories={product.categories} />
    </section>
  )
}

import React from 'react'
import toast from 'react-hot-toast'
import { Back } from '@/components/Back'
import { useParams } from 'react-router-dom'
import { StarRating } from './components/starRating'
import { useDispatch } from 'react-redux'
import { ProductSpecs } from './components/productSpecs'
import { addItemToCart } from '@/features/shoppingCartSlice'
import { ProductComment } from './components/productComment'
import { reqGetProductById } from '../admin/pages/product/services'
import type { ProductModel } from '@/types/productModel'
import { ProductImageGallery } from './components/productGallery'
import { ShieldCheck, ShoppingCart, Truck } from 'lucide-react'
import { Button, Divider, Snippet, Spinner } from '@heroui/react'

export const ProductPage = () => {
  const params = useParams<{ productId: string }>()
  const [product, setProduct] = React.useState<ProductModel | null>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (!params.productId) return
    setIsLoading(true)
    reqGetProductById(Number(params.productId))
      .then((res) => setProduct(res.data))
      .catch(console.log)
      .finally(() => setIsLoading(false))
  }, [params.productId])

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
    <div className='min-h-screen px-4 py-8'>
      <div className='mx-auto max-w-7xl'>
        <Back />
        <div className='grid gap-8 lg:grid-cols-2'>
          <div>
            <ProductImageGallery
              images={[
                'https://heroui.com/images/hero-card-complete.jpeg',
                'https://heroui.com/images/album-cover.png',
                'https://heroui.com/images/fruit-1.jpeg',
                'https://app.requestly.io/delay/1000/https://heroui.com/images/fruit-4.jpeg',
              ]}
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
              {product.stock > 0 ? (
                <p className='mb-6 flex items-center gap-2 text-sm font-medium text-green-600'>
                  <span className='h-2 w-2 rounded-full bg-green-600' />
                  En stock
                </p>
              ) : (
                <p className='mb-6 flex items-center gap-2 text-sm font-medium text-destructive'>
                  <span className='h-2 w-2 rounded-full bg-destructive' />
                  Agotado
                </p>
              )}
              <p className='mb-6 text-pretty leading-relaxed text-muted-foreground'>
                {product.description}
              </p>
              <div className='flex gap-3'>
                <Button
                  size='lg'
                  color='primary'
                  radius='sm'
                  className='flex-1 gap-2'
                  onPress={handleAddToCart}
                  disabled={false}
                >
                  <ShoppingCart className='h-5 w-5' />
                  Agregar al carrito
                </Button>

                <Snippet
                  symbol=''
                  radius='sm'
                  size='lg'
                  color='danger'
                  variant='solid'
                  codeString={window.location.href}
                >
                  Compartir
                </Snippet>
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
      </div>
      <ProductComment />
    </div>
  )
}

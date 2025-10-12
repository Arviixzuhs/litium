import toast from 'react-hot-toast'
import { products } from '../home/components/Products/products-mock'
import { useDispatch } from 'react-redux'
import { ProductSpecs } from './components/productSpecs'
import { addItemToCart } from '@/features/shoppingCartSlice'
import { ProductComment } from './components/productComment'
import { Link, useParams } from 'react-router-dom'
import { ProductImageGallery } from './components/productGallery'
import { Divider, Badge, Button } from '@heroui/react'
import { ShoppingCart, Star, Truck, ShieldCheck, Heart, Share2, ChevronLeft } from 'lucide-react'

export const ProductPage = () => {
  const params = useParams<{ productId: string }>()
  const product = products.find((item) => item.id === params.productId)
  const dispatch = useDispatch()
  if (!product) return

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
        totalPrice: product.price,
      }),
    )
    toast.success('Producto agregado al carrito')
  }

  return (
    <div className='min-h-screen px-4 py-8'>
      <div className='mx-auto max-w-7xl'>
        <Link
          to='/'
          className='mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
        >
          <ChevronLeft className='h-4 w-4' />
          Volver a productos
        </Link>
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
              <Badge className='mb-3'>{product.category}</Badge>
              <h1 className='mb-2 text-balance text-3xl font-bold md:text-4xl'>{product.name}</h1>
              <div className='mb-4 flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
                    />
                  ))}
                </div>
                <span className='font-medium'>{product.rating}</span>
                <span className='text-muted-foreground'>({product.reviews} reseñas)</span>
              </div>
              <div className='mb-6'>
                <span className='text-4xl font-bold'>${product.price.toLocaleString()}</span>
              </div>
              {product.inStock ? (
                <p className='mb-6 flex items-center gap-2 text-sm font-medium text-green-600'>
                  <span className='h-2 w-2 rounded-full bg-green-600' />
                  En stock - Envío inmediato
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
                  disabled={!product.inStock}
                >
                  <ShoppingCart className='h-5 w-5' />
                  Agregar al carrito
                </Button>
                <Button size='lg' radius='sm' color='danger'>
                  <Heart className='h-5 w-5' />
                </Button>
                <Button size='lg' radius='sm' color='warning'>
                  <Share2 className='h-5 w-5' />
                </Button>
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
            <ProductSpecs specs={product.specs} />
          </div>
        </div>
      </div>
      <ProductComment />
    </div>
  )
}

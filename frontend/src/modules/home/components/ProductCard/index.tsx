import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ProductModel } from '@/types/productModel'
import { addItemToCart } from '@/features/shoppingCartSlice'
import { ShoppingCart, Star } from 'lucide-react'
import { Badge, Button, Card, CardBody, Image } from '@heroui/react'

interface ProductCardProps {
  product: ProductModel
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch()

  const handleAddToCart = (product: ProductModel) => {
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
    <Card className='group h-full overflow-hidden transition-all hover:shadow-lg' radius='none'>
      <CardBody className='p-0'>
        <div className='relative  overflow-hidden bg-muted'>
          <Image
            src={'https://heroui.com/images/hero-card-complete.jpeg'}
            alt={product.name}
            radius='none'
            className='object-cover transition-transform duration-300 group-hover:scale-105'
          />
          {!product.inStock && (
            <Badge className='absolute right-2 top-2 bg-destructive text-destructive-foreground'>
              Agotado
            </Badge>
          )}
        </div>
        <div className='p-4'>
          <div className='mb-2 flex items-center gap-1'>
            <Star className='h-4 w-4 fill-accent text-accent' />
            <span className='text-sm font-medium'>{product.rating}</span>
            <span className='text-sm text-muted-foreground'>({product.reviews})</span>
          </div>
          <div></div>
          <Link to={`/product/${product.id}`}>
            <h3 className='mb-1 line-clamp-2 text-balance font-semibold leading-tight'>
              {product.name}
            </h3>
          </Link>
          <p className='mb-3 text-sm text-muted-foreground'>{product.category}</p>
          <div className='flex items-center justify-between gap-2'>
            <span className='text-2xl font-bold'>${product.price.toLocaleString()}</span>
            <Button
              size='sm'
              disabled={!product.inStock}
              className='gap-2'
              onPress={() => handleAddToCart(product)}
            >
              <ShoppingCart className='h-4 w-4' />
              Agregar
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

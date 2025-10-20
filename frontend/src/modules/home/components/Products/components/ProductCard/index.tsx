import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import { ProductModel } from '@/types/productModel'
import { addItemToCart } from '@/features/shoppingCartSlice'
import { Badge, Button, Card, CardBody, Image } from '@heroui/react'

interface ProductCardProps {
  product: ProductModel
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch()

  const handleAddToCart = () => {
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
          {product.stock === 0 && (
            <Badge className='absolute right-2 top-2 bg-destructive text-destructive-foreground'>
              Agotado
            </Badge>
          )}
        </div>
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <Link to={`/product/${product.id}`}>
              <h3 className='mb-1 line-clamp-2 text-balance font-semibold leading-tight'>
                {product.name}
              </h3>
            </Link>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <span className='text-2xl font-bold'>${product.price.toLocaleString()}</span>
            <Button
              size='sm'
              radius='sm'
              disabled={product.stock === 0}
              className='gap-2'
              color='primary'
              onPress={() => handleAddToCart()}
              startContent={<ShoppingCart className='h-4 w-4' />}
            >
              Agregar
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

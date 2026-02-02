import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ShoppingCart } from 'lucide-react'
import { ProductModel } from '@/types/productModel'
import { addItemToCart } from '@/features/shoppingCartSlice'
import { Button, Card, CardBody, Divider, Image } from '@heroui/react'
import { ProductStock } from './components/ProductStock'

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
    <Card className='group h-full overflow-hidden transition-all' radius='lg' shadow='none'>
      <CardBody className='p-0 '>
        <div className='flex justify-center items-center p-4 overflow-hidden bg-card'>
          <Image
            height={300}
            src={product.images?.[0]?.imageURL}
            alt={product.name}
            radius='none'
            width={300}
            className='object-contain transition-transform duration-300 group-hover:scale-105'
          />
        </div>
        <Divider></Divider>
        <div className='p-4 flex flex-col gap-4'>
          <div className='flex flex-col gap-1'>
            <Link to={`/product/${product.id}`}>
              <h3 className='mb-1 line-clamp-2 text-balance font-semibold leading-tight'>
                {product.name}
              </h3>
            </Link>
          </div>
          <div className='flex items-center justify-between gap-2'>
            <div className='flex flex-col gap-2'>
              <span className='text-2xl font-bold'>${product.price.toLocaleString()}</span>
              <ProductStock stock={product.stock} />
            </div>
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

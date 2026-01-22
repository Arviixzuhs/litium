import {
  handleOpenCart,
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
  resetShoppingCart,
} from '@/features/shoppingCartSlice'
import { RootState } from '@/store'
import { useNavigate } from 'react-router-dom'
import { Button, Image } from '@heroui/react'
import { reqCreateShoppingCart } from './services'
import { Plus, Minus, X, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

export const ShoppingCartSidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)
  const { cartItems, totalQuantity, totalPrice, isOpen } = useSelector(
    (state: RootState) => state.shoppingCart,
  )

  const handleClose = () => dispatch(handleOpenCart(null))

  const onConfirm = async () => {
    try {
      if (!user) {
        navigate('/login')
      }

      const response = await reqCreateShoppingCart({
        name: new Date().getTime().toString(),
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
      })
      handleClose()
      dispatch(resetShoppingCart(null))
      navigate(`/checkout/${response.data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className={`flex flex-col gap-3 p-4 fixed top-0 right-0 w-[500px] h-full bg-opacity-90 bg-white/50 dark:bg-black/20 backdrop-blur-md shadow-lg z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className='flex justify-between items-center'>
        <h2 className='text-xl font-bold'>Carrito de Compras</h2>
        <Button
          variant='flat'
          onPress={handleClose}
          className='text-gray-600 hover:text-red-500 dark:text-gray-300'
          isIconOnly
        >
          <X size={24} />
        </Button>
      </div>
      {cartItems.length === 0 ? (
        <p className='text-center text-gray-500 dark:text-gray-300'>Tu carrito está vacío.</p>
      ) : (
        <ul className='flex flex-col gap-2  max-h-96 overflow-y-auto hoverScrollbar'>
          {cartItems.map((item, index) => (
            <li key={index} className='justify-between flex gap-2  items-center'>
              <div className='flex gap-2 items-center'>
                <div className='bg-muted-2 max-w-25 rounded-sm'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    radius='sm'
                    height={70}
                    width={90}
                    className='object-cover max-w-25 transition-transform duration-300 group-hover:scale-105'
                  />
                </div>
                <div>
                  <h3 className='font-semibold'>{item.name}</h3>
                  <p className='text-gray-500 dark:text-gray-400'>${item.price.toLocaleString()}</p>
                  <p className='font-bold dark:text-gray-200'>
                    ${item.totalPrice.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className='flex gap-2 items-center justify-center'>
                <div className='flex items-center'>
                  <Button
                    size='sm'
                    variant='flat'
                    onPress={() => dispatch(decrementItemQuantity(item.id))}
                    isIconOnly
                    className='border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white w-6 h-6 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-500 transition duration-200 ease-in-out'
                  >
                    <Minus size={14} />
                  </Button>
                  <span className='mx-2 text-lg font-semibold dark:text-white'>
                    {item.quantity}
                  </span>
                  <Button
                    size='sm'
                    variant='flat'
                    onPress={() => dispatch(incrementItemQuantity(item.id))}
                    isIconOnly
                    className='border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-white w-6 h-6 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-500 transition duration-200 ease-in-out'
                  >
                    <Plus size={14} />
                  </Button>
                </div>
                <Button
                  size='sm'
                  variant='flat'
                  onPress={() => dispatch(removeItemFromCart(item.id))}
                  isIconOnly
                  className='text-red-500 hover:text-red-700 dark:text-red-400 transition duration-200 ease-in-out'
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div>
        <p className='font-bold dark:text-white'>Total: ${totalPrice.toLocaleString()}</p>
        <p className='text-gray-500 dark:text-gray-300'>Artículos: {totalQuantity}</p>
      </div>
      <Button
        color='primary'
        radius='sm'
        onPress={onConfirm}
        isDisabled={user !== null && cartItems.length == 0}
      >
        {user ? 'Iniciar compra' : 'Iniciar sesión'}
      </Button>
    </div>
  )
}

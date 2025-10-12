import { Badge } from '@heroui/react'
import { RootState } from '@/store'
import { ShoppingCart } from 'lucide-react'
import { handleOpenCart } from '@/features/shoppingCartSlice'
import { useDispatch, useSelector } from 'react-redux'

export const ShoppingCartTrigger = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state: RootState) => state.shoppingCart)

  const handleOpen = () => {
    dispatch(handleOpenCart(null))
  }

  return (
    <div className='flex items-center gap-4'>
      <div className='flex items-center gap-3 cursor-pointer' onClick={handleOpen}>
        <Badge color='danger' content={cartItems.length} shape='circle'>
          <ShoppingCart className='fill-current' size={30} />
        </Badge>
      </div>
    </div>
  )
}

import { Plus } from 'lucide-react'
import { Button } from '@heroui/button'
import { Searchbar } from './Searchbar'
import { useDispatch } from 'react-redux'
import { toggleAddItemModal } from '@/features/appTableSlice'

export const TopContent = () => {
  const dispatch = useDispatch()
  return (
    <div className='flex gap-2 w-full'>
      <Searchbar />
      <Button
        onPress={() => dispatch(toggleAddItemModal(null))}
        color='primary'
        startContent={<Plus />}
      >
        Agregar
      </Button>
    </div>
  )
}

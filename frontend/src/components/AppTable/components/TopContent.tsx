import { Plus } from 'lucide-react'
import { Button } from '@heroui/button'
import { Searchbar } from './Searchbar'
import { useDispatch } from 'react-redux'
import { toggleAddItemModal } from '@/features/appTableSlice'

interface TopContentProps {
  hiddeAdd?: boolean
}

export const TopContent = ({ hiddeAdd }: TopContentProps) => {
  const dispatch = useDispatch()

  return (
    <div className='flex gap-2 w-full'>
      <Searchbar />
      {!hiddeAdd && (
        <Button
          onPress={() => dispatch(toggleAddItemModal(null))}
          color='primary'
          startContent={<Plus />}
        >
          Agregar
        </Button>
      )}
    </div>
  )
}

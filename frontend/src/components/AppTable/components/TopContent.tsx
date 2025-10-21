import { Plus } from 'lucide-react'
import { Button } from '@heroui/button'
import { Searchbar } from './Searchbar'
import { useDispatch } from 'react-redux'
import { toggleAddItemModal } from '@/features/appTableSlice'
import { FilterByDatePicker } from './FilterByDate'

interface TopContentProps {
  hiddeAdd?: boolean
  filterByDate?: boolean
}

export const TopContent = ({ hiddeAdd, filterByDate }: TopContentProps) => {
  const dispatch = useDispatch()

  return (
    <div className='flex gap-2 w-full'>
      {filterByDate && <FilterByDatePicker />}
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

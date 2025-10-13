import { useDispatch } from 'react-redux'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import {
  setCurrentItemToDelete,
  setCurrentItemToUpdate,
  toggleConfirmDeleteModal,
  toggleEditItemModal,
} from '@/features/appTableSlice'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react'

export interface DropdownActionProps {
  itemId: number
}

export const DropdownAction = ({ itemId }: DropdownActionProps) => {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(setCurrentItemToDelete(itemId))
    dispatch(toggleConfirmDeleteModal(null))
  }

  const handleUpdate = () => {
    dispatch(setCurrentItemToUpdate(itemId))
    dispatch(toggleEditItemModal(null))
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size='sm' variant='light'>
          <MoreVertical />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Static Actions'>
        <DropdownItem key='edit' onPress={handleUpdate} startContent={<Edit size={14} />}>
          Editar
        </DropdownItem>
        <DropdownItem
          key='delete'
          className='text-danger'
          color='danger'
          onPress={handleDelete}
          startContent={<Trash2 size={14} />}
        >
          Eliminar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

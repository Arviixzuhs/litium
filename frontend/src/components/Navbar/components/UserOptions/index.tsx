import { logOut } from '@/utils/logOut'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Avatar, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from '@heroui/react'

export const NavbarUserOptions = () => {
  const user = useSelector((state: RootState) => state.user)

  const token = localStorage.getItem('token')

  if (token && user !== null) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            isBordered
            as='button'
            color='primary'
            size='sm'
            className='transition-transform'
          />
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile Actions' variant='flat'>
          <DropdownItem key='profile' className='h-14 gap-2 default-text-color'>
            <p className='font-semibold'>Registrado como</p>
            <p className='font-semibold'>{user?.email}</p>
          </DropdownItem>
          <DropdownItem
            key='logout'
            className='text-danger'
            color='danger'
            onClick={() => logOut()}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  } else {
    return (
      <Avatar as='button' size='sm' color='primary' className='transition-transform' isBordered />
    )
  }
}

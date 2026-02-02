import { RootState } from '@/store'
import { appConfig } from '@/config'
import { useSelector } from 'react-redux'
import { NavbarUserOptions } from './components/UserOptions'
import { ProductSearchInput } from './components/ProductSearchInput'
import { ShoppingCartSidebar } from '../ShoppingCartSidebar'
import { ShoppingCartTrigger } from '../ShoppingCartSidebar/components/ShoppingCartTrigger'
import {
  Link,
  Button,
  Navbar as HeroUINavbar,
  NavbarItem,
  NavbarBrand,
  NavbarContent,
} from '@heroui/react'

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <>
      <HeroUINavbar>
        <NavbarBrand>
          <Link href='/' className='flex items-center gap-2'>
            <p className='font-bold text-inherit'>{appConfig.company}</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-4 w-full' justify='center'>
          <ProductSearchInput />
        </NavbarContent>
        {user && (
          <NavbarItem>
            <Link href='/purchases'>Mis compras</Link>
          </NavbarItem>
        )}

        <NavbarContent justify='end'>
          <ShoppingCartTrigger />
          {!user ? (
            <>
              <NavbarItem className='hidden lg:flex'>
                <Link href='/login'>Iniciar sesión</Link>
              </NavbarItem>
              <NavbarItem>
                <Button as={Link} color='primary' href='/register' radius='sm' variant='flat'>
                  Registrarme
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarUserOptions />
          )}
        </NavbarContent>
      </HeroUINavbar>
      <ShoppingCartSidebar />
    </>
  )
}

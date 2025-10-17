import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { ExternalLink } from 'lucide-react'
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
import { NavbarUserOptions } from './components/UserOptions'

export const LitiumLogo = () => {
  return (
    <svg fill='none' height='36' viewBox='0 0 32 32' width='36'>
      <path
        clipRule='evenodd'
        d='M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z'
        fill='currentColor'
        fillRule='evenodd'
      />
    </svg>
  )
}

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.user)
  return (
    <>
      <HeroUINavbar>
        <NavbarBrand>
          <Link href='/'>
            <LitiumLogo />
            <p className='font-bold text-inherit'>Litium C.A</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className='hidden sm:flex gap-4' justify='center'></NavbarContent>
        <NavbarContent justify='end'>
          {user && (
            <NavbarItem>
              <Link href='/dashboard' target='_blank' className='flex gap-2'>
                Dasboard
                <ExternalLink size={15} />
              </Link>
            </NavbarItem>
          )}
          {user && (
            <NavbarItem>
              <Link href='purchases'>Mis compras</Link>
            </NavbarItem>
          )}

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

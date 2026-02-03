import { appConfig } from '@/config'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer className='border-t bg-white border-gray-200 mt-12'>
      <div className='mx-auto max-w-7xl px-4 py-12'>
        <div className='grid gap-8 md:grid-cols-4'>
          <div>
            <h3 className='mb-4 font-bold'>{appConfig.company}</h3>
            <p className='text-sm text-muted-foreground'>
              Tu tienda de tecnología de confianza con los mejores productos del mercado.
            </p>
          </div>
          <div>
            <h4 className='mb-4 font-semibold'>Comprar</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Ofertas
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Nuevos lanzamientos
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-4 font-semibold'>Soporte</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Centro de ayuda
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Envíos y devoluciones
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Garantía
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='mb-4 font-semibold'>Empresa</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  to='/'
                  className='text-muted-foreground transition-colors hover:text-foreground'
                >
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-200 pt-8 text-center text-sm text-muted-foreground'>
          <p>
            &copy; {new Date().getFullYear()} {appConfig.company}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

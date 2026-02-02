import { Link } from 'react-router-dom'
import { AlertCircle, Home } from 'lucide-react'

export const NotFoundPage = () => {
  return (
    <div className='flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-8'>
          <div className='inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-6'>
            <AlertCircle className='w-12 h-12 text-red-600' />
          </div>
          <h1 className='text-7xl font-bold text-gray-900 mb-2'>404</h1>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Página no encontrada</h2>
          <p className='text-gray-600 mb-8'>
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        <div className='space-y-3'>
          <Link
            to='/'
            className='inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200'
          >
            <Home className='w-5 h-5 mr-2' />
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export interface BackProps {
  title?: string
}

export const Back = ({ title }: BackProps) => {
  return (
    <Link
      to='/'
      className='mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
    >
      <ChevronLeft className='h-4 w-4' />
      {title || 'Volver'}
    </Link>
  )
}

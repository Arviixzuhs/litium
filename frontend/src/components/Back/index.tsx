import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'

export interface BackProps {
  title?: string
}

export const Back = ({ title }: BackProps) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(-1)}
      className='cursor-pointer inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground'
    >
      <ChevronLeft className='h-4 w-4' />
      {title || 'Volver'}
    </div>
  )
}

import { Chip } from '@heroui/react'
import { ShoppingCartStatus } from '@/types/shoppingCartModel'

export type StatusConfig = {
  [key in ShoppingCartStatus]: {
    label: string
    color: 'warning' | 'default' | 'primary' | 'secondary' | 'success' | 'danger' | undefined
  }
}

export const ShoppingCartStatusConfig: StatusConfig = {
  [ShoppingCartStatus.PENDING]: {
    label: 'Pendiente',
    color: 'warning',
  },
  [ShoppingCartStatus.PAID]: {
    label: 'Pagado',
    color: 'success',
  },
  [ShoppingCartStatus.CANCELED]: {
    label: 'Cancelado',
    color: 'danger',
  },
}

interface ChoppingCartStatusChipProps {
  status: ShoppingCartStatus
}

export const ChoppingCartStatusChip = ({ status }: ChoppingCartStatusChipProps) => {
  return (
    <Chip size='sm' color={ShoppingCartStatusConfig[status].color} variant='flat'>
      {ShoppingCartStatusConfig[status].label}
    </Chip>
  )
}

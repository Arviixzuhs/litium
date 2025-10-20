import { TableColumnInterface } from '@/features/appTableSlice'

export const tableColumns: TableColumnInterface[] = [
  {
    name: 'Vendedor',
    uid: 'sellerName',
  },
  {
    name: 'Comprador',
    uid: 'buyerName',
  },
  {
    name: 'Total',
    uid: 'total',
  },
  {
    name: 'Fecha',
    uid: 'createdAt',
  },
]

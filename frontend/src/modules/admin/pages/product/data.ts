import { ModalInput, TableColumnInterface } from '@/features/appTableSlice'

export const tableColumns: TableColumnInterface[] = [
  {
    name: 'Nombre',
    uid: 'name',
  },
  {
    name: 'Precio',
    uid: 'price',
  },
  {
    name: 'Cantidad',
    uid: 'stock',
  },
  {
    name: 'Acciones',
    uid: 'actions',
  },
]

export const modalInputs: ModalInput[] = [
  { name: 'name', label: 'Nombre', placeholder: 'Ingresa el nombre', type: 'text', required: true },
  {
    name: 'price',
    label: 'Precio',
    placeholder: 'Ingresa el precio',
    type: 'number',
    required: true,
  },
  {
    name: 'stock',
    label: 'Stock',
    placeholder: 'Ingresa el stock',
    type: 'number',
    required: true,
  },
  {
    name: 'description',
    label: 'Descripcion',
    placeholder: 'Ingresa la descripción',
    type: 'text',
  },
]

import { ModalInput, TableColumnInterface } from '@/features/appTableSlice'

export const tableColumns: TableColumnInterface[] = [
  {
    name: 'Nombre',
    uid: 'name',
  },
  {
    name: 'Teléfono',
    uid: 'phone',
  },
  {
    name: 'Email',
    uid: 'email',
  },
  {
    name: 'Dirección',
    uid: 'address',
  },
  {
    name: 'Acciones',
    uid: 'actions',
  },
]

export const modalInputs: ModalInput[] = [
  { name: 'name', label: 'Nombre', placeholder: 'Ingresa el nombre', type: 'text', required: true },
  {
    name: 'phone',
    label: 'Teléfono',
    placeholder: 'Ingresa el teléfono',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Ingresa el Email',
    type: 'text',
  },
  {
    name: 'address',
    label: 'Dirección',
    placeholder: 'Ingresa la dirección',
    type: 'text',
  },
]

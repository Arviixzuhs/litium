import { ModalInput, TableColumnInterface } from '@/features/appTableSlice'

export const tableColumns: TableColumnInterface[] = [
  {
    name: 'Nombre',
    uid: 'name',
  },
  {
    name: 'Acciones',
    uid: 'actions',
  },
]

export const modalInputs: ModalInput[] = [
  { name: 'name', 
    label: 'Nombre', 
    placeholder: 'Ingresa el nombre', 
    type: 'text', 
    required: true 
  },
  {
    name: 'description',
    label: 'Descripcion',
    placeholder: 'Ingresa la descripción',
    type: 'text',
  },
]

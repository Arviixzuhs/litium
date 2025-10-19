import { useEffect } from 'react'
import { RootState } from '@/store'
import { setFormData } from '@/features/appTableSlice'
import { Plus, Trash2 } from 'lucide-react'
import { Input, Button } from '@heroui/react'
import { useDispatch, useSelector } from 'react-redux'

export interface ProductSpecification {
  title: string
  value: string
}

export const ProductSpecificationsInput = () => {
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.appTable)
  const formDataKey = 'specifications'
  const specs = (table.formData?.[formDataKey] as ProductSpecification[]) || []

  useEffect(() => {
    const currentItem = table.data.find((item) => item.id === table.currentItemToUpdate)
    if (currentItem && currentItem.specifications && specs.length === 0) {
      dispatch(setFormData({ name: formDataKey, value: currentItem.specifications }))
    }
  }, [table.currentItemToUpdate, dispatch])

  const handleChange = (index: number, field: 'title' | 'value', value: string) => {
    const newSpecs = [...specs]
    newSpecs[index] = { ...newSpecs[index], [field]: value }
    dispatch(setFormData({ name: formDataKey, value: newSpecs }))
  }

  const handleAdd = () => {
    dispatch(setFormData({ name: formDataKey, value: [...specs, { title: '', value: '' }] }))
  }

  const handleRemove = (index: number) => {
    const newSpecs = specs.filter((_, i) => i !== index)
    dispatch(setFormData({ name: formDataKey, value: newSpecs }))
  }

  return (
    <div className='flex flex-col gap-2 w-full'>
      <label className='font-medium'>Especificaciones</label>
      <p className='text-sm text-gray-500'>Ingresa las especificaciones técnicas del producto</p>
      {specs.map((spec, index) => (
        <div key={index} className='flex gap-2 items-center'>
          <Input
            placeholder='Título'
            value={spec.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
            className='flex-1'
          />
          <Input
            placeholder='Valor'
            value={spec.value}
            onChange={(e) => handleChange(index, 'value', e.target.value)}
            className='flex-1'
          />
          <Button size='sm' onPress={() => handleRemove(index)} color='danger' isIconOnly>
            <Trash2 size={14} />
          </Button>
        </div>
      ))}
      <Button onPress={handleAdd} size='sm' variant='flat' color='primary' startContent={<Plus />}>
        Añadir especificación
      </Button>
    </div>
  )
}

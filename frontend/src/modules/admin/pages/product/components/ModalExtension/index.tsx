import { Divider } from '@heroui/react'
import { Autocomplete } from '@/components/Autocomplete'
import { reqGetSuppliers } from '@/modules/admin/pages/supplier/services'
import { reqGetCategories } from '@/modules/admin/pages/category/services'
import { ProductSpecificationsInput } from '../ProductSpecificationInput'

export const ModalExtension = () => {
  return (
    <>
      <Divider />
      <Autocomplete
        chips
        label='Categorías'
        formDataKey='categories'
        placeholder='Busca una categoría'
        fetchItems={(search) =>
          reqGetCategories({
            name: search,
            page: 0,
            size: 10,
          }).then((res) => res.data.content)
        }
      />
      <Autocomplete
        chips
        label='Proveedores'
        formDataKey='suppliers'
        placeholder='Busca a un proveedor'
        fetchItems={(search) =>
          reqGetSuppliers({
            name: search,
            page: 0,
            size: 10,
          }).then((res) => res.data.content)
        }
      />
      <Divider />
      <ProductSpecificationsInput />
    </>
  )
}

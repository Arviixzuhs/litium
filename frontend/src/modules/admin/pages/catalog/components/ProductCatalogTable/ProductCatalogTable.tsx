import React from 'react'
import { Trash2 } from 'lucide-react'
import { RootState } from '@/store'
import { setFormData } from '@/features/appTableSlice'
import { EmptyContent } from '@/components/AppTable/components/EmptyContent'
import { reqGetProducts } from '../../../product/services'
import { useDispatch, useSelector } from 'react-redux'
import { AutocompleteChip, Autocomplete } from '@/components/Autocomplete'
import {
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableColumn,
} from '@heroui/react'

export const ProductCatalogTable = () => {
  const table = useSelector((state: RootState) => state.appTable)
  const items = (table.formData?.['products'] as AutocompleteChip[]) || []
  const dispatch = useDispatch()

  React.useEffect(() => {
    reqGetProducts({
      page: 0,
      size: 100,
      catalogId: table.currentItemToUpdate ? String(table.currentItemToUpdate) : undefined,
    }).then((res) => {
      dispatch(
        setFormData({
          name: 'products',
          value: res.data.content.map((item) => ({
            id: item.id,
            label: item.name,
          })),
        }),
      )
    })
  }, [])

  const handleRemove = (itemToRemove: AutocompleteChip) => {
    dispatch(
      setFormData({
        name: 'products',
        value: items.filter((item) => item.id !== itemToRemove.id),
      }),
    )
  }

  return (
    <Table
      classNames={{
        wrapper: 'border',
      }}
      shadow='none'
      topContent={
        <Autocomplete
          formDataKey='products'
          placeholder='Buscar producto...'
          fetchItems={(search) =>
            reqGetProducts({
              name: search,
              page: 0,
              size: 10,
              excludeCatalogId: table.currentItemToUpdate
                ? String(table.currentItemToUpdate)
                : undefined,
            }).then((res) => res.data.content)
          }
        />
      }
    >
      <TableHeader>
        <TableColumn>Nombre</TableColumn>
        <TableColumn>
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody items={items} emptyContent={<EmptyContent />}>
        {(item) => (
          <TableRow key={String(item.id)}>
            <TableCell className='default-text-color'>{item['label']}</TableCell>
            <TableCell className='default-text-color'>
              <Button isIconOnly color='danger' size='sm' onPress={() => handleRemove(item)}>
                <Trash2 size={14} />
              </Button>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

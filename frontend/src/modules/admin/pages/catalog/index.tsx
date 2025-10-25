import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@/components/AppTable'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { ModalExtension } from './components/ModalExtension'
import { AppTableActions } from '@/components/AppTable/interfaces/appTable'
import { AutocompleteChip } from '@/components/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { tableColumns, modalInputs } from './data'
import { reqCreateCatalog, reqDeleteCatalog, reqGetCatalogs, reqUpdateCatalog } from './services'
import {
  addItem,
  updateItem,
  deleteItem,
  setTableData,
  setModalInputs,
  setTableColumns,
} from '@/features/appTableSlice'

export const AdminCatalogPage = () => {
  const table = useSelector((state: RootState) => state.appTable)
  const dispatch = useDispatch()
  const [debounceValue] = useDebounce(table.filterValue, 100)

  const loadData = async () => {
    try {
      const response = await reqGetCatalogs({
        name: debounceValue,
        page: table.currentPage,
        size: table.rowsPerPage,
      })
      dispatch(setTableData(response.data))
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    loadData()
  }, [debounceValue, table.currentPage, table.rowsPerPage])

  React.useEffect(() => {
    dispatch(setModalInputs(modalInputs))
    dispatch(setTableColumns(tableColumns))
  }, [])

  const { products, ...data } = table.formData
  const tableFormData = {
    ...data,
    productIds: (products as AutocompleteChip[])?.map((item) => item.id) || [],
  }

  const tableActions: AppTableActions = {
    create: async () => {
      const response = await reqCreateCatalog(tableFormData)
      dispatch(addItem(response.data))
      toast.success('Catálogo creado correctamente')
    },
    delete: async () => {
      await reqDeleteCatalog(table.currentItemToDelete)
      dispatch(deleteItem(table.currentItemToDelete))
      toast.success('Catálogo eliminado correctamente')
    },
    update: async () => {
      await reqUpdateCatalog(table.currentItemToUpdate, tableFormData)
      dispatch(updateItem({ id: table.currentItemToUpdate, newData: tableFormData }))
      toast.success('Catálogo actualizado correctamente')
    },
  }

  return (
    <AppTable
      tableActions={tableActions}
      modalExtension={<ModalExtension />}
      searchbarPlaceholder='Buscar catálogo por nombre...'
    />
  )
}

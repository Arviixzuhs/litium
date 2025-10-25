import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@/components/AppTable'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { AppTableActions } from '@/components/AppTable/interfaces/appTable'
import { useDispatch, useSelector } from 'react-redux'
import { tableColumns, modalInputs } from './data'
import {
  reqCreateSupplier,
  reqDeleteSupplier,
  reqGetSuppliers,
  reqUpdateSupplier,
} from './services'
import {
  addItem,
  updateItem,
  deleteItem,
  setTableData,
  setModalInputs,
  setTableColumns,
} from '@/features/appTableSlice'

export const AdminSupplierPage = () => {
  const table = useSelector((state: RootState) => state.appTable)
  const dispatch = useDispatch()
  const [debounceValue] = useDebounce(table.filterValue, 100)

  const loadData = async () => {
    try {
      const response = await reqGetSuppliers({
        page: table.currentPage,
        size: table.rowsPerPage,
        searchValue: debounceValue,
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

  const tableActions: AppTableActions = {
    create: async () => {
      const response = await reqCreateSupplier(table.formData)
      dispatch(addItem(response.data))
      toast.success('Proveedor creado correctamente')
    },
    delete: async () => {
      await reqDeleteSupplier(table.currentItemToDelete)
      dispatch(deleteItem(table.currentItemToDelete))
      toast.success('Proveedor eliminado correctamente')
    },
    update: async () => {
      await reqUpdateSupplier(table.currentItemToUpdate, table.formData)
      dispatch(updateItem({ id: table.currentItemToUpdate, newData: table.formData }))
      toast.success('Proveedor actualizado correctamente')
    },
  }

  return (
    <AppTable
      tableActions={tableActions}
      searchbarPlaceholder='Buscar proveedor por nombre, email o teléfono...'
    />
  )
}

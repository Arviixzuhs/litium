import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@/components/AppTable'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { AppTableActions } from '@/components/AppTable/interfaces/appTable'
import { useDispatch, useSelector } from 'react-redux'
import { tableColumns, modalInputs } from './data'
import { 
  reqCreateCatalog, 
  reqDeleteCatalog, 
  reqGetCatalogs, 
  reqUpdateCatalog 
} from './services'
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

  const tableActions: AppTableActions = {
    create: async () => {
      await reqCreateCatalog(table.formData)
      dispatch(addItem(table.formData))
      toast.success('Catalogo creado correctamente')
    },
    delete: async () => {
      await reqDeleteCatalog(table.currentItemToDelete)
      dispatch(deleteItem(table.currentItemToDelete))
      toast.success('Catalogo eliminado correctamente')
    },
    update: async () => {
      await reqUpdateCatalog(table.currentItemToUpdate, table.formData)
      dispatch(updateItem({ id: table.currentItemToUpdate, newData: table.formData }))
      toast.success('Catalogo actualizado correctamente')
    },
  }

  return <AppTable tableActions={tableActions} />
}

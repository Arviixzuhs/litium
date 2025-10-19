import React from 'react'
import toast from 'react-hot-toast'
import { AppTable } from '@/components/AppTable'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { ModalExtension } from './components/ModalExtension'
import { AppTableActions } from '@/components/AppTable/interfaces/appTable'
import { AutocompleteChip } from '@/components/AutocompleteWithChips'
import { useDispatch, useSelector } from 'react-redux'
import { tableColumns, modalInputs } from './data'
import { deleteItem, setTableData, setModalInputs, setTableColumns } from '@/features/appTableSlice'
import { reqCreateProduct, reqDeleteProduct, reqGetProducts, reqUpdateProduct } from './services'

export const AdminProductPage = () => {
  const table = useSelector((state: RootState) => state.appTable)
  const dispatch = useDispatch()
  const [debounceValue] = useDebounce(table.filterValue, 100)

  const loadData = async () => {
    try {
      const response = await reqGetProducts({
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

  const { categories, suppliers, ...data } = table.formData
  const tableFormData = {
    ...data,
    supplierIds: (suppliers as AutocompleteChip[])?.map((item) => item.id) || [],
    categoryIds: (categories as AutocompleteChip[])?.map((item) => item.id) || [],
  }

  const tableActions: AppTableActions = {
    create: async () => {
      await reqCreateProduct(tableFormData)
      loadData()
      toast.success('Producto creado correctamente')
    },
    delete: async () => {
      await reqDeleteProduct(table.currentItemToDelete)
      dispatch(deleteItem(table.currentItemToDelete))
      toast.success('Producto eliminado correctamente')
    },
    update: async () => {
      await reqUpdateProduct(table.currentItemToUpdate, tableFormData)
      loadData()
      toast.success('Producto actualizado correctamente')
    },
  }

  return <AppTable tableActions={tableActions} modalExtension={<ModalExtension />} />
}

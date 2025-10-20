import React from 'react'
import { AppTable } from '@/components/AppTable'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { tableColumns } from './data'
import { reqGetInvoices } from './services'
import { useDispatch, useSelector } from 'react-redux'
import { setTableColumns, setTableData } from '@/features/appTableSlice'

export const AdminInvoicePage = () => {
  const table = useSelector((state: RootState) => state.appTable)
  const dispatch = useDispatch()
  const [debounceValue] = useDebounce(table.filterValue, 100)

  const loadData = async () => {
    try {
      const response = await reqGetInvoices({
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
    dispatch(setTableColumns(tableColumns))
  }, [])

  React.useEffect(() => {
    loadData()
  }, [debounceValue, table.currentPage, table.rowsPerPage])

  return <AppTable hiddeAdd />
}

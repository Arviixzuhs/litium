import React from 'react'
import type { RootState } from '@/store'
import { TopContent } from './components/TopContent'
import { RenderCell } from './components/RenderCell'
import { useLocation } from 'react-router-dom'
import { AddItemModal } from './components/AddItemModal'
import { EmptyContent } from './components/EmptyContent'
import { EditItemModal } from './components/EditItemModal'
import { TablePagination } from './components/Pagination'
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal'
import type { AppTableActions } from './interfaces/appTable'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterValue, type TableColumnInterface } from '@/features/appTableSlice'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'

export interface AppTableProps {
  hiddeAdd?: boolean
  tableActions?: AppTableActions
  modalExtension?: React.ReactElement
}

export const AppTable = ({ tableActions, modalExtension, hiddeAdd }: AppTableProps) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const table = useSelector((state: RootState) => state.appTable)

  React.useEffect(() => {
    dispatch(setFilterValue(''))
  }, [location])

  return (
    <>
      <Table
        shadow='none'
        isCompact
        isHeaderSticky
        topContent={<TopContent hiddeAdd={hiddeAdd} />}
        bottomContent={<TablePagination />}
        topContentPlacement='outside'
        bottomContentPlacement='outside'
        classNames={{
          wrapper: 'h-full',
          base: 'h-full',
        }}
      >
        <TableHeader columns={table.columns}>
          {(column: TableColumnInterface) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={!!column.sortable}
            >
              <>{column.name}</>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={table.data} emptyContent={<EmptyContent />}>
          {(item: any) => (
            <TableRow key={String(item.id)}>
              {(columnKey) => (
                <TableCell className='default-text-color'>
                  <RenderCell column={columnKey} value={item[columnKey]} itemId={item.id} />
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddItemModal action={() => tableActions?.create()}>{modalExtension}</AddItemModal>
      <EditItemModal action={() => tableActions?.update()}>{modalExtension}</EditItemModal>
      <ConfirmDeleteModal handleDelete={() => tableActions?.delete()} />
    </>
  )
}

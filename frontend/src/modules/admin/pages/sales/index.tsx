import React from 'react'
import { Info } from 'lucide-react'
import { AppTable } from '@/components/AppTable'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { tableColumns } from './data'
import { InvoiceModel } from '@/types/invoiceModel'
import { reqGetInvoices } from './services'
import { ViewPurchaseModal } from '@/modules/purchases/components/PurchaseCard/components/ViewPurchaseModal'
import { modalTypes, useModal } from '@/hooks/useModal'
import { DropdownItemInteface } from '@/components/AppTable/components/DropdownAction'
import { ShoppingCartProductModel } from '@/types/shoppingCartModel'
import { useDispatch, useSelector } from 'react-redux'
import { setTableColumns, setTableData } from '@/features/appTableSlice'

export const AdminInvoicePage = () => {
  const table = useSelector((state: RootState) => state.appTable)
  const dispatch = useDispatch()
  const [debounceValue] = useDebounce(table.filterValue, 100)
  const [_isOpen, toggleOpen] = useModal(modalTypes.viewPurchases)
  const [purchaseProducts, setPurchaseProducts] = React.useState<ShoppingCartProductModel[]>([])

  const loadData = async () => {
    try {
      const response = await reqGetInvoices({
        page: table.currentPage,
        size: table.rowsPerPage,
        toDate: table.dateFilter.end,
        fromDate: table.dateFilter.start,
        searchValue: debounceValue,
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
  }, [debounceValue, table.currentPage, table.rowsPerPage, table.dateFilter])

  const viewDetails = (id: number) => {
    const currentItem: InvoiceModel = table.data.find((item) => item.id === id)
    if (!currentItem) return

    setPurchaseProducts(currentItem.products)
    toggleOpen()
  }

  const dropdownItems: DropdownItemInteface[] = [
    {
      key: 'viewDetails',
      title: 'Ver detalles',
      onPress: (itemId) => viewDetails(itemId),
      startContent: <Info />,
    },
  ]

  return (
    <>
      <AppTable
        hiddeAdd
        filterByDate
        dropdownItems={dropdownItems}
        searchbarPlaceholder='Buscar venta por comprador o vendedor (nombre o email)...'
      />
      <ViewPurchaseModal purchaseProducts={purchaseProducts || []} />
    </>
  )
}

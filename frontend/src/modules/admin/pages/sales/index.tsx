import React from 'react'
import { Download, Info } from 'lucide-react'
import { AppTable } from '@/components/AppTable'
import { RootState } from '@/store'
import { useDebounce } from 'use-debounce'
import { tableColumns } from './data'
import { InvoiceModel } from '@/types/invoiceModel'
import { ViewPurchaseModal } from '@/modules/purchases/components/PurchaseCard/components/ViewPurchaseModal'
import { TopContentExtension } from './components/TopContentExtension'
import { modalTypes, useModal } from '@/hooks/useModal'
import { DropdownItemInteface } from '@/components/AppTable/components/DropdownAction'
import { ShoppingCartProductModel } from '@/types/shoppingCartModel'
import { useDispatch, useSelector } from 'react-redux'
import { setTableColumns, setTableData } from '@/features/appTableSlice'
import { reqDownloadSaleReport, reqGetInvoices } from './services'

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

  const handleDownloadSale = async (id: number) => {
    await reqDownloadSaleReport(id)
  }

  const dropdownItems: DropdownItemInteface[] = [
    {
      key: 'viewDetails',
      title: 'Ver detalles',
      onPress: (itemId) => viewDetails(itemId),
      startContent: <Info size={14} />,
    },
    {
      key: 'downloadInvoice',
      title: 'Descargar venta',
      onPress: (itemId) => handleDownloadSale(itemId),
      startContent: <Download size={14} />,
    },
  ]

  return (
    <>
      <AppTable
        hiddeAdd
        filterByDate
        dropdownItems={dropdownItems}
        topContentExtension={<TopContentExtension />}
        searchbarPlaceholder='Buscar venta por código, comprador o empleado...'
      />
      <ViewPurchaseModal purchaseProducts={purchaseProducts || []} />
    </>
  )
}

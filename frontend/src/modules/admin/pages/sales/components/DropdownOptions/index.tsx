import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { Download, ChevronDown } from 'lucide-react'
import { reqDownloadSalesReport } from '../../services'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@heroui/react'

export const DropdownOptions = () => {
  const table = useSelector((state: RootState) => state.appTable)
  const handleDownloadReport = async () => {
    await reqDownloadSalesReport({
      fromDate: table.dateFilter.start,
      toDate: table.dateFilter.end,
    })
  }

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant='flat' color='primary' startContent={<ChevronDown size={14} />}>
            Opciones
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label='Static Actions'>
          <DropdownItem
            startContent={<Download size={14} />}
            key='new'
            onPress={handleDownloadReport}
          >
            Descargar reporte
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}

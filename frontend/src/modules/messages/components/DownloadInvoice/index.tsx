import { Chip } from '@heroui/react'
import { reqDownloadSaleReport } from '@/modules/admin/pages/sales/services'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const DownaloadInvoice = () => {
  const chat = useSelector((state: RootState) => state.chat)

  const handleDownloadInvoice = async () => {
    if (!chat.invoiceId) return
    await reqDownloadSaleReport(chat.invoiceId)
  }

  if (!chat.invoiceId) return

  return (
    <Chip color='primary' variant='flat' radius='sm'>
      <div className='text-muted-foreground w-full'>
        Descargar factura{' '}
        <span className='cursor-pointer text-blue-500' onClick={() => handleDownloadInvoice()}>
          click aquí
        </span>
      </div>
    </Chip>
  )
}

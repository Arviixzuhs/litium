import { api } from '@/api/axios'
import { InvoiceModel } from '@/types/invoiceModel'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ReqDownloadSalesReportParams, ReqGetSalesParams } from './interface'

export const reqGetInvoices = (params?: ReqGetSalesParams) =>
  api.get<PaginatedResponse<InvoiceModel>>('/invoice', { params })

export const reqDownloadSalesReport = async (params?: ReqDownloadSalesReportParams) => {
  const response = await api.get('/reports/sales', { params, responseType: 'blob' })

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'reporte_ventas.pdf')
  document.body.appendChild(link)
  link.click()
  link.remove()
}

export const reqDownloadSaleReport = async (id: number) => {
  const response = await api.get(`/reports/sale/${id}`, { responseType: 'blob' })

  const url = window.URL.createObjectURL(new Blob([response.data]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'reporte_venta.pdf')
  document.body.appendChild(link)
  link.click()
  link.remove()
}

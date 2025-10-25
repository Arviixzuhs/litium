export interface MonthlySales {
  month: string
  ventas: number
}

export interface TopProduct {
  name: string
  value: number
}

export interface DashboardSalesSummary {
  monthlySales: MonthlySales[]
  topProducts: TopProduct[]
}

export interface DashboardMetricsDto extends DashboardSalesSummary {
  totalProducts: number
  totalSuppliers: number
  totalInvoices: number
  totalCategories: number
  totalCatalogs: number
  totalPendingOrders: number
}

export interface DashboardSalesTotalDto {
  totalRevenue: number
}

export interface DashboardSalesCurrentDto {
  year: number
  month: number
  totalRevenue: number
  previousRevenue: number
  variationPercentage?: number | null
}

export interface DashboardSalesByDateDto {
  year: number
  month?: number
  mode: 'year' | 'month'
  totalRevenue: number
}

export interface DashboardModel {
  metrics: DashboardMetricsDto
  salesTotal: DashboardSalesTotalDto
  salesCurrent: DashboardSalesCurrentDto
  salesByDate: DashboardSalesByDateDto
}

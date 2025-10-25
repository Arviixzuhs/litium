import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import { DashboardService } from './dashboard.service'
import { DashboardMetricsDto } from './dto/dashboard-metrics.dto'
import { DashboardSalesTotalDto } from './dto/dashboard-sales-total.dto'
import { DashboardSalesCurrentDto } from './dto/dashboard-sales-current.dto'
import { DashboardSalesByDateDto } from './dto/dashboard-sales-by-date.dto'

@ApiTags('Dashboard')
@Controller('dashboard')
@ApiBearerAuth()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('metrics')
  @ApiOperation({
    summary: 'Obtener métricas globales (productos, proveedores, facturas, categorías, catálogos)',
  })
  @ApiResponse({ status: 200, type: DashboardMetricsDto })
  async getMetrics(): Promise<DashboardMetricsDto> {
    return this.dashboardService.getMetrics()
  }

  @Get('sales/total')
  @ApiOperation({ summary: 'Obtener la suma total de ingresos' })
  @ApiResponse({ status: 200, type: DashboardSalesTotalDto })
  async getSalesTotal(): Promise<DashboardSalesTotalDto> {
    return this.dashboardService.getSalesTotal()
  }

  @Get('sales/current')
  @ApiOperation({ summary: 'Obtener ventas del mes actual y variación respecto al mes anterior' })
  @ApiResponse({ status: 200, type: DashboardSalesCurrentDto })
  async getSalesCurrent(): Promise<DashboardSalesCurrentDto> {
    return this.dashboardService.getSalesCurrent()
  }

  @Get('sales')
  @ApiOperation({ summary: 'Obtener ventas filtradas por fecha' })
  @ApiResponse({ status: 200, type: DashboardSalesByDateDto })
  async getSalesByDate(
    @Query('year') year?: string,
    @Query('month') month?: string,
  ): Promise<DashboardSalesByDateDto> {
    const yearNum = year ? parseInt(year, 10) : new Date().getFullYear()
    const monthNum = month ? parseInt(month, 10) : undefined
    return this.dashboardService.getSalesByDate(yearNum, monthNum)
  }
}

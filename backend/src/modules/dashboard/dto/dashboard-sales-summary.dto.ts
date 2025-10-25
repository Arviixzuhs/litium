import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsArray } from 'class-validator'

class MonthlySalesDto {
  @ApiProperty({ example: 'Ene', description: 'Nombre del mes' })
  @IsString()
  month: string

  @ApiProperty({ example: 45000, description: 'Ventas totales del mes' })
  @IsNumber()
  sales: number
}

class TopProductDto {
  @ApiProperty({ example: 'Electrónica', description: 'Nombre del producto' })
  @IsString()
  name: string

  @ApiProperty({ example: 35, description: 'Cantidad vendida del producto' })
  @IsNumber()
  value: number
}

export class DashboardSalesSummaryDto {
  @ApiProperty({ type: [MonthlySalesDto], description: 'Resumen de ventas por mes' })
  @IsArray()
  monthlySales: MonthlySalesDto[]

  @ApiProperty({ type: [TopProductDto], description: 'Productos más vendidos' })
  @IsArray()
  topProducts: TopProductDto[]
}

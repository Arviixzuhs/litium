import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class DashboardSalesByDateDto {
  @ApiProperty({ example: 2025, description: 'Año' })
  @IsNumber()
  year: number

  @ApiPropertyOptional({ example: 10, description: 'Mes opcional (1-12)' })
  @IsNumber()
  month?: number

  @ApiProperty({
    enum: ['year', 'month'],
    example: 'month',
    description: 'Modo de agregación de datos',
  })
  mode: 'year' | 'month'

  @ApiProperty({ example: 3500.5, description: 'Ingresos totales' })
  @IsNumber()
  totalRevenue: number
}

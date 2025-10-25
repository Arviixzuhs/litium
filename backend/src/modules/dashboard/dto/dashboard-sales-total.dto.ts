import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class DashboardSalesTotalDto {
  @ApiProperty({ example: 152340.75, description: 'Ingresos totales' })
  @IsNumber()
  totalRevenue: number
}

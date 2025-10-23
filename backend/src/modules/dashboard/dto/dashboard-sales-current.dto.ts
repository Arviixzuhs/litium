import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DashboardSalesCurrentDto {
  @ApiProperty({ example: 2025, description: 'Año' })
  @IsNumber()
  year: number;

  @ApiProperty({ example: 10, description: 'Mes' })
  @IsNumber()
  month: number;

  @ApiProperty({ example: 3500.50, description: 'Ingresos totales del mes actual' })
  @IsNumber()
  totalRevenue: number;

  @ApiProperty({ example: 4200.00, description: 'Ingresos totales del mes anterior' })
  @IsNumber()
  previousRevenue: number;

  @ApiProperty({ example: -16.66, description: 'Variación porcentual respecto al mes anterior' })
  @IsNumber()
  variationPercentage?: number | null;
}
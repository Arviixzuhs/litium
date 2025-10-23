import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator'

export class DashboardMetricsDto {
  @ApiProperty({ example: 187, description: 'Total de productos' })
  @IsNumber()
  totalProducts: number;

  @ApiProperty({ example: 25, description: 'Total de proveedores' })
  @IsNumber()
  totalSuppliers: number;

  @ApiProperty({ example: 320, description: 'Total de facturas' })
  @IsNumber()
  totalInvoices: number;

  @ApiProperty({ example: 12, description: 'Total de categorías' })
  @IsNumber()
  totalCategories: number;

  @ApiProperty({ example: 5, description: 'Total de catálogos' })
  @IsNumber()
  totalCatalogs: number;
}
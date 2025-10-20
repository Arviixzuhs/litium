import { Type } from 'class-transformer'
import { PaginationDto } from '@/common/dto/pagination.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator'

export class InvoiceFilterDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtra facturas por ID' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number

  @ApiPropertyOptional({ description: 'Filtra facturas por nombre del cliente' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: 'Filtra facturas por RIF del cliente' })
  @IsOptional()
  @IsString()
  rif?: string

  @ApiPropertyOptional({ description: 'Filtra facturas por número de teléfono del cliente' })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiPropertyOptional({ description: 'Filtra facturas por ID del vendedor (sellerId)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  sellerId?: number

  @ApiPropertyOptional({
    description: 'Filtra facturas que incluyan un producto específico (productId)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  productId?: number

  @ApiPropertyOptional({ description: 'Monto total mínimo de la factura' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minTotal?: number

  @ApiPropertyOptional({ description: 'Monto total máximo de la factura' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxTotal?: number

  @ApiPropertyOptional({ description: 'Filtra facturas creadas desde esta fecha (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fromDate?: string

  @ApiPropertyOptional({ description: 'Filtra facturas creadas hasta esta fecha (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  toDate?: string

  @ApiPropertyOptional({ description: 'Indica si la factura fue eliminada' })
  @IsOptional()
  @Type(() => Boolean)
  isDeleted?: boolean
}

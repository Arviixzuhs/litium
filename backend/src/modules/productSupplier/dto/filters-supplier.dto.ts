import { Type } from 'class-transformer'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class SupplierFiltersDto {
  @ApiPropertyOptional({ description: 'Filtra proveedores por nombre' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: 'Número de página' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number

  @ApiPropertyOptional({ description: 'Cantidad por página' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  size?: number
}

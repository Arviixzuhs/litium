import { Type } from 'class-transformer'
import { PaginationDto } from '@/common/dto/pagination.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsString, IsNumber, IsOptional, IsDateString } from 'class-validator'

export class ProductFilterDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtra productos por nombre' })
  @IsOptional()
  @IsString()
  name?: string

  @ApiPropertyOptional({ description: 'Estado de visibilidad del producto' })
  @IsOptional()
  @IsString()
  show?: string

  @ApiPropertyOptional({ description: 'Precio mínimo' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number

  @ApiPropertyOptional({ description: 'Precio máximo' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number

  @ApiPropertyOptional({ description: 'Nombre de la categoría' })
  @IsOptional()
  @IsString()
  category?: string

  @ApiPropertyOptional({ description: 'Fecha desde (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  fromDate?: string

  @ApiPropertyOptional({ description: 'Fecha hasta (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  toDate?: string

  @ApiPropertyOptional({ description: 'ID del catálogo' })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  catalogId?: number
}

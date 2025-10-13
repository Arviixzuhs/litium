import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsString } from 'class-validator'

export class CategoryFiltersDto {
  @ApiPropertyOptional({ description: 'Filtra categorías por nombre' })
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

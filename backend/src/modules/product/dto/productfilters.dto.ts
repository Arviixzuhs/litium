import { ApiPropertyOptional } from '@nestjs/swagger'

export class ProductFilterDto {
  @ApiPropertyOptional()
  name?: string

  @ApiPropertyOptional()
  show?: string

  @ApiPropertyOptional()
  minPrice?: number

  @ApiPropertyOptional()
  maxPrice?: number

  @ApiPropertyOptional()
  category?: string

  @ApiPropertyOptional()
  fromDate?: string

  @ApiPropertyOptional()
  toDate?: string

  @ApiPropertyOptional()
  catalogId?: number
}

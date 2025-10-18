import { PaginationDto } from '@/common/dto/pagination.dto'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CategoryFiltersDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtra categorías por nombre' })
  @IsOptional()
  @IsString()
  name?: string
}

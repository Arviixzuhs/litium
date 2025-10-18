import { ApiProperty } from '@nestjs/swagger'
import { PaginationDto } from '@/common/dto/pagination.dto'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class CatalogFiltersDto extends PaginationDto {
  @ApiProperty({
    example: 'Electrodomesticos',
    description: 'Nombre del catálogo',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string
}

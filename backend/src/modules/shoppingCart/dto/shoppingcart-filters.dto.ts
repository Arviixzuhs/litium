import { ApiProperty } from '@nestjs/swagger'
import { PaginationDto } from '@/common/dto/pagination.dto'
import { IsOptional, IsString, MaxLength } from 'class-validator'

export class ShoppingCartFiltersDto extends PaginationDto {
  @ApiProperty({
    example: 'Impresora',
    description: 'Nombre del producto',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  productName?: string
}

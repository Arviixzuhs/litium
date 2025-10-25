import { ApiProperty } from '@nestjs/swagger'
import { PaginationDto } from '@/common/dto/pagination.dto'
import { Transform, Type } from 'class-transformer'
import { IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator'

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

  @ApiProperty({
    example: true,
    description: 'Filtrar solo los carritos del usuario actual',
    required: false,
  })
  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  mine?: boolean
}

import { IsOptional, IsInt, Min, IsString, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class FindShoppingCartDto {
  @ApiPropertyOptional({ description: 'Número de página (comienza en 0)', example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  page?: number

  @ApiPropertyOptional({ description: 'Cantidad de elementos por página', example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size?: number

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

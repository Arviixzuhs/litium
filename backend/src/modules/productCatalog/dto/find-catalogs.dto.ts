import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class FindCatalogsDto {
  @ApiProperty({
    example: 'Electrodomesticos',
    description: 'Nombre del catálogo',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name?: string

  @ApiPropertyOptional({ description: 'Número de página (comienza en 0)' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'La página debe ser un número entero' })
  page?: number

  @ApiPropertyOptional({ description: 'Cantidad de elementos por página' })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El tamaño debe ser un número entero' })
  size?: number
}

import { IsInt, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class FindCommentsDto {
  @ApiProperty({ description: 'ID del producto (obligatorio)' })
  @Type(() => Number)
  @IsInt({ message: 'El productId debe ser un número entero' })
  @IsNotEmpty({ message: 'El productId es obligatorio' })
  productId: number

  @ApiPropertyOptional({ description: 'Número de página (comienza en 0)' })
  @Type(() => Number)
  @IsInt({ message: 'La página debe ser un número entero' })
  page?: number

  @ApiPropertyOptional({ description: 'Cantidad de elementos por página' })
  @Type(() => Number)
  @IsInt({ message: 'El tamaño debe ser un número entero' })
  size?: number
}

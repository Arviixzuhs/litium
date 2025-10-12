import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { Type } from 'class-transformer'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class FindCatalogsDto {
  @ApiProperty({ example: 'Electrodomesticos', description: 'Nombre del catálogo' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(50)
  name: string

  @ApiPropertyOptional({ description: 'Número de página (comienza en 0)' })
  @Type(() => Number)
  @IsInt({ message: 'La página debe ser un número entero' })
  page?: number

  @ApiPropertyOptional({ description: 'Cantidad de elementos por página' })
  @Type(() => Number)
  @IsInt({ message: 'El tamaño debe ser un número entero' })
  size?: number
}

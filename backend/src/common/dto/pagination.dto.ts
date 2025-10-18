import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class PaginationDto {
  @ApiPropertyOptional({ description: 'Número de página (comienza en 0)' })
  @Type(() => Number)
  @IsInt({ message: 'La página debe ser un número entero' })
  @IsOptional()
  @Min(0)
  page?: number

  @ApiPropertyOptional({ description: 'Cantidad de elementos por página' })
  @Type(() => Number)
  @IsInt({ message: 'El tamaño debe ser un número entero' })
  @IsOptional()
  @Min(1)
  size?: number
}

import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty } from 'class-validator'

export class AssignProductToCategoryDto {
  @ApiProperty({ example: 1, description: 'Id del producto', required: true })
  @Type(() => Number)
  @IsInt({ message: 'El productId debe ser un número entero' })
  @IsNotEmpty({ message: 'El productId es obligatorio' })
  productId: number

  @ApiProperty({ example: 1, description: 'Id de la category', required: true })
  @Type(() => Number)
  @IsInt({ message: 'El categoryId debe ser un número entero' })
  @IsNotEmpty({ message: 'El categoryId es obligatorio' })
  categoryId: number
}

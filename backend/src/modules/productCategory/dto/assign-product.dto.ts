import { IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AssignProductToCategoryDto {
  @ApiProperty({ example: 1, description: 'Id del producto', required: true })
  @IsNumber({}, { message: 'El campo debe ser un número' })
  productId: number

  @ApiProperty({ example: 1, description: 'Id de la category', required: true })
  @IsNumber()
  categoryId: number
}

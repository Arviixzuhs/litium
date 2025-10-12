import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsEnum } from 'class-validator'

export enum EditType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export class EditProductQuantityDto {
  @ApiProperty({ description: 'ID del producto en el carrito (obligatorio)', example: 42 })
  @Type(() => Number)
  @IsInt({ message: 'El productId debe ser un número entero' })
  @IsNotEmpty({ message: 'El productId es obligatorio' })
  productId: number

  @ApiProperty({ enum: EditType, description: 'Tipo de edición: INCREMENT o DECREMENT' })
  @IsEnum(EditType, { message: 'El editType debe ser INCREMENT o DECREMENT' })
  editType: EditType
}

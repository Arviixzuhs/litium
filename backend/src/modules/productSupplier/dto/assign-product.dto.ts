import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty } from 'class-validator'

export class AssignProductToSupplierDto {
  @ApiProperty({ example: 1, description: 'Id del producto', required: true })
  @Type(() => Number)
  @IsInt({ message: 'El productId debe ser un número entero' })
  @IsNotEmpty({ message: 'El productId es obligatorio' })
  productId: number

  @ApiProperty({ example: 1, description: 'Id del proveedor', required: true })
  @Type(() => Number)
  @IsInt({ message: 'El supplierId debe ser un número entero' })
  @IsNotEmpty({ message: 'El supplierId es obligatorio' })
  supplierId: number
}

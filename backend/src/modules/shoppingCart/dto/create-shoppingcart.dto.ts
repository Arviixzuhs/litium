import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'
import { ShoppingCartProductDto } from './shoppingcart-product.dto'

export class CreateShoppingCartDto {
  @ApiProperty({
    example: 'Nombre de ejemplo',
    required: true,
    description: 'Nombre breve del carrito',
  })
  @IsString()
  @MaxLength(250)
  name: string

  @ApiProperty({
    example: [{ productId: 1, quantity: 10 }],
    required: true,
    description: 'Productos del carrito de compras',
  })
  products: ShoppingCartProductDto[]
}

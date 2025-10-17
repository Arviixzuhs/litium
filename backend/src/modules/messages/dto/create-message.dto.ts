import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsString } from 'class-validator'

export class CreateMessageDto {
  @ApiProperty({
    description: 'ID del usuario que recibe el mensaje',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  userId: number

  @ApiProperty({
    description: 'ID del usuario que envía el mensaje',
    example: 5,
  })
  @Type(() => Number)
  @IsInt()
  senderId: number

  @ApiProperty({
    description: 'ID del carrito de compras asociado al mensaje',
    example: 10,
  })
  @Type(() => Number)
  @IsInt()
  shoppingCartId: number

  @ApiProperty({
    description: 'Contenido del mensaje enviado',
    example: 'Hola, estoy interesado en este producto.',
  })
  @IsString()
  message: string
}

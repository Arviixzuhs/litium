import { IsInt, IsString } from 'class-validator'

export class CreateMessageDto {
  @IsInt()
  userId: number

  @IsInt()
  senderId: number

  @IsInt()
  shoppingCartId: number

  @IsString()
  message: string
}

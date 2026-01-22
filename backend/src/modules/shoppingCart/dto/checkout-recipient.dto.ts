import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class CheckoutRecipientDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  firstName: string

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  lastName: string

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  phone: string

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  documentId: string
}

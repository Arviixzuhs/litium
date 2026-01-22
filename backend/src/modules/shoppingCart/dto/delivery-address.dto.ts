import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator'

export class CheckoutDeliveryAddressDto {
  @ApiProperty()
  @IsString()
  @MaxLength(50)
  state: string

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  city: string

  @ApiProperty()
  @IsString()
  @MaxLength(250)
  addressLine: string

  @ApiProperty()
  @IsString()
  @MaxLength(250)
  referencePoint: string
}

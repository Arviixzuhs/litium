import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, ValidateNested } from 'class-validator'
import { DeliveryAgency, DeliveryMethod } from '@prisma/client'
import { CheckoutDeliveryAddressDto } from './delivery-address.dto'

export class CheckoutDeliveryDto {
  @ApiProperty({ enum: DeliveryMethod })
  @IsEnum(DeliveryMethod)
  method: DeliveryMethod

  @ApiProperty({ enum: DeliveryAgency, nullable: true })
  @IsEnum(DeliveryAgency)
  agency: DeliveryAgency

  @ApiProperty({ type: CheckoutDeliveryAddressDto })
  @ValidateNested()
  @Type(() => CheckoutDeliveryAddressDto)
  address: CheckoutDeliveryAddressDto
}

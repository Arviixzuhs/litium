import { Transform, Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { ValidateNested } from 'class-validator'
import { CheckoutPaymentDto } from './checkout-payment.dto'
import { CheckoutDeliveryDto } from './checkout-delivery.dto'
import { CheckoutRecipientDto } from './checkout-recipient.dto'

export class CheckoutDto {
  @ApiProperty({ type: CheckoutRecipientDto })
  @ValidateNested()
  @Transform(({ value }) => {
    if (typeof value === 'string') return JSON.parse(value)
    return value
  })
  @Type(() => CheckoutRecipientDto)
  recipient: CheckoutRecipientDto

  @ApiProperty({ type: CheckoutDeliveryDto })
  @ValidateNested()
  @Transform(({ value }) => {
    if (typeof value === 'string') return JSON.parse(value)
    return value
  })
  @Type(() => CheckoutDeliveryDto)
  delivery: CheckoutDeliveryDto

  @ApiProperty({ type: CheckoutPaymentDto })
  @ValidateNested()
  @Transform(({ value }) => {
    if (typeof value === 'string') return JSON.parse(value)
    return value
  })
  @Type(() => CheckoutPaymentDto)
  payment: CheckoutPaymentDto
}

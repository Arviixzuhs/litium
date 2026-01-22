import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsString, IsNumber, MaxLength, IsDateString } from 'class-validator'
import { Transform } from 'class-transformer'
import { PaymentMethod } from '@prisma/client'

export class CheckoutPaymentDto {
  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method: PaymentMethod

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  reference: string

  @ApiProperty({
    example: '120.50',
    description: 'Monto del pago recibido como string y transformado a number',
  })
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number

  @ApiProperty()
  @IsDateString()
  paymentDate: string
}

import { ApiProperty } from '@nestjs/swagger'
import { ShoppingCartProduct } from '@prisma/client'

export class InvoiceResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the invoice' })
  id: number

  @ApiProperty({ example: 'J-12345678-9', description: 'Customer RIF (tax ID)', nullable: true })
  rif?: string

  @ApiProperty({ example: 'Carlos López', description: 'Customer full name' })
  name: string

  @ApiProperty({ example: '+58 412 1234567', description: 'Customer phone number', nullable: true })
  phone?: string

  @ApiProperty({ example: 249.99, description: 'Total amount of the invoice', nullable: true })
  total?: number

  @ApiProperty({
    example: 'Av. Bolívar 123, Caracas, Venezuela',
    description: 'Customer address',
    nullable: true,
  })
  address?: string

  @ApiProperty({ example: 5, description: 'Seller user ID associated with this invoice' })
  sellerId: number

  @ApiProperty({ example: 'Juan Pérez', description: 'Full name of the seller', nullable: true })
  sellerName?: string

  @ApiProperty({ example: 'Carlos López', description: 'Full name of the buyer', nullable: true })
  buyerName?: string

  @ApiProperty({
    description: 'Products included in this invoice',

    required: false,
  })
  products?: ShoppingCartProduct[]

  @ApiProperty({
    example: false,
    description: 'Indicates if the invoice has been deleted',
    nullable: true,
  })
  isDeleted?: boolean

  @ApiProperty({
    example: '2025-10-20T12:34:56.000Z',
    description: 'Date when the invoice was deleted (if applicable)',
    nullable: true,
  })
  deletedAt?: Date

  @ApiProperty({
    example: '2025-10-18T09:23:45.000Z',
    description: 'Date when the invoice was created',
  })
  createdAt: Date
}

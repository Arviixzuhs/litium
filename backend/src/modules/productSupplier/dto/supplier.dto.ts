import { ApiProperty } from '@nestjs/swagger'

export class SupplierResponseDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty({ required: false })
  phone?: string

  @ApiProperty({ required: false })
  email?: string

  @ApiProperty({ required: false })
  address?: string

  @ApiProperty()
  createdAt: string
}

import { IsInt, IsOptional, IsString, Min } from 'class-validator'

export class CreateInvoiceDto {
  @IsInt()
  shoppingCartId: number

  @IsInt()
  sellerId: number

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @Min(0)
  total?: number

  @IsOptional()
  @IsString()
  rif?: string

  @IsOptional()
  @IsString()
  phone?: string

  @IsOptional()
  @IsString()
  address?: string
}

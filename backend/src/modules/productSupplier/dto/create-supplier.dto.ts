import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsEmail, MaxLength } from 'class-validator'

export class CreateSupplierDto {
  @ApiProperty({ example: 'Samsung', description: 'Nombre del proveedor' })
  @IsString()
  @MaxLength(100)
  name: string

  @ApiProperty({ example: 'ejemplo@ejemplo.com', description: 'Email del proveedor' })
  @IsOptional()
  @IsEmail()
  email?: string

  @ApiProperty({ example: '+582345986565', description: 'Numero del proveedor' })
  @IsOptional()
  @IsString()
  phone?: string

  @ApiProperty({ example: 'Maturin', description: 'Dirección del proveedor' })
  @IsOptional()
  @IsString()
  address?: string
}

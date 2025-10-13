import { ApiProperty } from '@nestjs/swagger'
import { Transform, Type } from 'class-transformer'
import { IsString, IsOptional, IsNumber, MaxLength } from 'class-validator'

export class CreateProductDto {
  @ApiProperty({ example: 'Camisa azul', description: 'Nombre del producto' })
  @IsString()
  @MaxLength(50)
  name: string

  @ApiProperty({
    example: 'https://cdn.tienda.com/camisa.jpg',
    description: 'URL de imagen del producto',
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string

  @ApiProperty({ example: 19.99, description: 'Precio del producto', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number

  @ApiProperty({ example: '10', description: 'Stock disponible', required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stock?: number

  @ApiProperty({
    example: 'Camiseta 100% algodón',
    description: 'Descripción breve del producto',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(150)
  description?: string
}

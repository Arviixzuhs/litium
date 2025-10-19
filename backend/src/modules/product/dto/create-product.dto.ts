import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional, IsNumber, MaxLength, IsArray } from 'class-validator'
import { ProductSpecificationDto } from './product-specification.dto'

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

  @ApiProperty({
    example: [1, 2, 3],
    description: 'IDs de categorías asociadas al producto',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  categoryIds?: number[]

  @ApiProperty({
    example: [1, 2],
    description: 'IDs de proveedores asociados al producto',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  supplierIds?: number[]

  @ApiProperty({
    example: [{ title: 'Color', value: 'Azul' }],
    description: 'Especificaciones del producto',
    required: false,
    type: [ProductSpecificationDto],
  })
  @IsOptional()
  @IsArray()
  @Type(() => ProductSpecificationDto)
  specifications?: ProductSpecificationDto[]
}

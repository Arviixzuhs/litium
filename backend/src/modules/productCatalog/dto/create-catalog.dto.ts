import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateCatalogDto {
  @ApiProperty({ example: 'Electrodomesticos', description: 'Nombre del catálogo' })
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(50)
  name: string

  @ApiProperty({
    example: 'Electrodomesticos de color azul',
    description: 'Descripción del catálogo',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  description: string

  @ApiProperty({
    example: [1, 2],
    description: 'IDs de productos asociados al catalogo',
    required: false,
    type: [Number],
  })
  @IsOptional()
  @IsArray()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  productIds?: number[]
}

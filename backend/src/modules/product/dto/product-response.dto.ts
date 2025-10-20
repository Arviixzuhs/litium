import { CategoryResponseDto } from '@/modules/productCategory/dto/category-response.dto'
import { SupplierResponseDto } from '@/modules/productSupplier/dto/supplier-response.dto'
import { ApiProperty } from '@nestjs/swagger'
import { ProductSpecificationDto } from './product-specification.dto'

export class ProductResponseDto {
  @ApiProperty({ description: 'ID del producto' })
  id: number

  @ApiProperty({ description: 'Nombre del producto' })
  name: string

  @ApiProperty({ description: 'Visibilidad del producto', required: false })
  show?: string

  @ApiProperty({ description: 'Cantidad en stock', required: false })
  stock?: number

  @ApiProperty({ description: 'URL de la imagen', required: false })
  image?: string

  @ApiProperty({ description: 'Precio del producto', required: false })
  price?: number

  @ApiProperty({ description: 'Descripción del producto', required: false })
  description?: string

  @ApiProperty({ description: 'Fecha de creación', required: false })
  createdAt?: Date

  @ApiProperty({ description: 'Fecha de última actualización', required: false })
  updatedAt?: Date

  @ApiProperty({ description: 'Número total de comentarios', required: false })
  commentsCount?: number

  @ApiProperty({ type: () => [SupplierResponseDto], required: false })
  suppliers?: SupplierResponseDto[]

  @ApiProperty({ type: () => [CategoryResponseDto], required: false })
  categories?: CategoryResponseDto[]

  @ApiProperty({ type: () => [ProductSpecificationDto], required: false })
  specifications?: ProductSpecificationDto[]

  @ApiProperty({ description: 'Calificación promedio del producto', required: false })
  qualification?: number
}

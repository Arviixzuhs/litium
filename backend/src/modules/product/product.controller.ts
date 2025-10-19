import { ProductsService } from './product.service'
import { ProductFilterDto } from './dto/product-filters.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger'
import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common'
import { Page } from '@/types/Page'
import { ProductResponseDto } from './dto/product-response.dto'
import { ProductPageResponseDto } from './dto/product-page-response.dto'

@ApiTags('Products')
@Controller('product')
@ApiBearerAuth()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente.',
    type: ProductResponseDto,
  })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos con filtros opcionales',
    type: ProductPageResponseDto,
  })
  findAll(@Query() filters?: ProductFilterDto): Promise<Page<ProductResponseDto>> {
    return this.productsService.findAll(filters)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.', type: ProductResponseDto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  findBy(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findBy(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente.',
    type: ProductResponseDto,
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un producto' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Producto marcado como eliminado.',
    type: ProductResponseDto,
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id)
  }
}

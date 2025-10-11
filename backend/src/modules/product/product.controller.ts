import { ProductsService } from './product.service'
import { ProductFilterDto } from './dto/productfilters.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
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

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado correctamente.' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos.' })
  findAll(@Query() filters?: ProductFilterDto) {
    return this.productsService.findAll(filters)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto actualizado correctamente.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un producto' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Producto marcado como eliminado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id)
  }
}

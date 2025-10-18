import { Page } from '@/types/Page'
import { Category } from '@prisma/client'
import { CategoryDto } from './dto/category.dto'
import { CategoryFiltersDto } from './dto/category-filters.dto'
import { ProductCategoryService } from './productCategory.service'
import { AssignProductToCategoryDto } from './dto/assign-product.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Put,
  Get,
  Body,
  Post,
  Param,
  Query,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common'

@ApiTags('Products Category')
@Controller('/category')
@ApiBearerAuth()
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo categoría' })
  @ApiResponse({ status: 201, description: 'Categoría creado correctamente.' })
  create(@Body() dto: CategoryDto) {
    return this.productCategoryService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos las categorías' })
  @ApiResponse({ status: 200, description: 'Lista de categorías con filtros opcionales' })
  findAll(@Query() filters?: CategoryFiltersDto): Promise<Page<Category>> {
    return this.productCategoryService.findAll(filters)
  }

  @Delete(':categoryId')
  @ApiOperation({ summary: 'Borra una categoría' })
  @ApiResponse({ status: 200, description: 'Categoría eliminado correctamente.' })
  delete(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.productCategoryService.delete(categoryId)
  }

  @Put(':categoryId')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada correctamente.' })
  update(@Param('categoryId') categoryId: number, @Body() dto: CategoryDto) {
    return this.productCategoryService.update(categoryId, dto)
  }

  @Post()
  @ApiOperation({ summary: 'Assigna un producto a una categoría' })
  assignProductToCategory(@Body() dto: AssignProductToCategoryDto) {
    return this.productCategoryService.assignProductToCategory(dto)
  }
}

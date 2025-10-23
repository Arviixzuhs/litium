import { Page } from '@/types/Page'
import { CategoryDto } from './dto/category.dto'
import { Permissions, perm } from '@/common/decorators/permissions.decorator'
import { CategoryFiltersDto } from './dto/category-filters.dto'
import { CategoryResponseDto } from './dto/category-response.dto'
import { ProductCategoryService } from './productCategory.service'
import { CategoryPageResponseDto } from './dto/category-page-response.dto'
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
  UseGuards,
} from '@nestjs/common'
import { PermissionGuard } from '@/guards/permission.guard'

@ApiTags('Products Category')
@Controller('/category')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo categoría' })
  @ApiResponse({
    status: 201,
    description: 'Categoría creado correctamente.',
    type: CategoryResponseDto,
  })
  @Permissions(perm.advanced.administrator)
  create(@Body() dto: CategoryDto) {
    return this.productCategoryService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos las categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de categorías con filtros opcionales',
    type: CategoryPageResponseDto,
  })
  findAll(@Query() filters?: CategoryFiltersDto): Promise<Page<CategoryResponseDto>> {
    return this.productCategoryService.findAll(filters)
  }

  @Delete(':categoryId')
  @ApiOperation({ summary: 'Borra una categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminado correctamente.',
    type: CategoryResponseDto,
  })
  delete(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.productCategoryService.delete(categoryId)
  }

  @Put(':categoryId')
  @ApiOperation({ summary: 'Actualizar una categoría' })
  @ApiResponse({
    status: 200,
    description: 'Categoría eliminada correctamente.',
    type: CategoryResponseDto,
  })
  update(@Param('categoryId') categoryId: number, @Body() dto: CategoryDto) {
    return this.productCategoryService.update(categoryId, dto)
  }
}

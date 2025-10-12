import { Put, Body, Post, Param, Delete, Controller, Get, Query } from '@nestjs/common'
import { CatalogDto } from './dto/catalog.dto'
import { ProductCatalogService } from './productCatalog.service'
import { AssignProductToCatalogDto } from './dto/assign-product.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FindCatalogsDto } from './dto/find-catalogs.dto'

@ApiTags('Products Catalog')
@Controller('/catalog')
@ApiBearerAuth()
export class ProductCatalogController {
  constructor(private readonly productCatalogService: ProductCatalogService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo catálogo' })
  @ApiResponse({ status: 201, description: 'Categoría creado correctamente.' })
  create(@Body() dto: CatalogDto) {
    return this.productCatalogService.create(dto)
  }

  @Delete(':catalogId')
  @ApiOperation({ summary: 'Borra un catálogo' })
  @ApiResponse({ status: 200, description: 'Categoría eliminado correctamente.' })
  delete(@Param('catalogId') catalogId: number) {
    return this.productCatalogService.delete(catalogId)
  }

  @Put(':catalogId')
  @ApiOperation({ summary: 'Actualizar un catálogo' })
  @ApiResponse({ status: 200, description: 'Categoría eliminada correctamente.' })
  update(@Param('catalogId') catalogId: number, @Body() dto: CatalogDto) {
    return this.productCatalogService.update(catalogId, dto)
  }

  @Post()
  @ApiOperation({ summary: 'Assigna un producto a una catálogo' })
  assignProductToCatalog(@Body() dto: AssignProductToCatalogDto) {
    return this.productCatalogService.assignProductToCatalog(dto.productId, dto.catalogId)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener catálogos de productos con filtros opcionales' })
  findByProductId(@Query() query: FindCatalogsDto) {
    const { name, page, size } = query
    return this.productCatalogService.findAll(name, page, size)
  }
}

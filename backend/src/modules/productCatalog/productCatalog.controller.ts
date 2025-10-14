import { Put, Body, Post, Param, Delete, Controller, Get, Query, ParseIntPipe, Patch } from '@nestjs/common'
import { CatalogDto } from './dto/catalog.dto'
import { ProductCatalogService } from './productCatalog.service'
import { AssignProductToCatalogDto } from './dto/assign-product.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FindCatalogsDto } from './dto/find-catalogs.dto'
import { Page } from '@/types/Page'
import { Catalog } from '@prisma/client'
import { UpdateCatalogDto } from './dto/update-catalog.dto'

@ApiTags('Products Catalog')
@Controller('/catalog')
@ApiBearerAuth()
export class ProductCatalogController {
  constructor(private readonly productCatalogService: ProductCatalogService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo catálogo' })
  @ApiResponse({ status: 201, description: 'Catalogo creado correctamente.' })
  create(@Body() dto: CatalogDto) {
    return this.productCatalogService.create(dto)
  }

  @Delete(':catalogId')
  @ApiOperation({ summary: 'Borra un catálogo' })
  @ApiResponse({ status: 200, description: 'Catalogo eliminado correctamente.' })
  delete(@Param('catalogId', ParseIntPipe) catalogId: number) {
    return this.productCatalogService.delete(catalogId)
  }

  @Patch(':catalogId')
  @ApiOperation({ summary: 'Actualizar un catálogo' })
  @ApiResponse({ status: 200, description: 'Catalogo actualizado correctamente.' })
  update(@Param('catalogId') catalogId: number, @Body() dto: UpdateCatalogDto) {
    return this.productCatalogService.update(catalogId, dto)
  }

  @Post()
  @ApiOperation({ summary: 'Assigna un producto a un catálogo' })
  assignProductToCatalog(@Body() dto: AssignProductToCatalogDto) {
    return this.productCatalogService.assignProductToCatalog(dto.productId, dto.catalogId)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los catálogos' })
  @ApiResponse({ status: 200, description: 'Lista de catálogos con filtros opcionales' })
  findAll(@Query() filters: FindCatalogsDto): Promise<Page<Catalog>> {
    return this.productCatalogService.findAll(filters)
  }
}

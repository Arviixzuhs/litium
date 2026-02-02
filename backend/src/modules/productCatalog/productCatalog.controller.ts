import { Page } from '@/types/Page'
import { PermissionGuard } from '@/guards/permission.guard'
import { CreateCatalogDto } from './dto/create-catalog.dto'
import { UpdateCatalogDto } from './dto/update-catalog.dto'
import { CatalogFiltersDto } from './dto/catalog-filters.dto'
import { perm, Permissions } from '@/common/decorators/permissions.decorator'
import { CatalogResponseDto } from './dto/catalog-response.dto'
import { ProductCatalogService } from './productCatalog.service'
import { CatalogPageResponseDto } from './dto/catalog-page-response.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Get,
  Body,
  Post,
  Param,
  Query,
  Patch,
  Delete,
  UseGuards,
  Controller,
  ParseIntPipe,
} from '@nestjs/common'

@ApiTags('Products Catalog')
@Controller('/catalog')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class ProductCatalogController {
  constructor(private readonly productCatalogService: ProductCatalogService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los catálogos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de catálogos con filtros opcionales',
    type: CatalogPageResponseDto,
  })
  findAll(@Query() filters: CatalogFiltersDto): Promise<Page<CatalogResponseDto>> {
    return this.productCatalogService.findAll(filters)
  }

  @Get(':catalogId')
  @ApiOperation({ summary: 'Obtener catálogo por id' })
  @ApiResponse({
    status: 200,
    type: CatalogPageResponseDto,
  })
  findById(@Param('catalogId', ParseIntPipe) catalogId: number): Promise<CatalogResponseDto> {
    return this.productCatalogService.findBy(catalogId)
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo catálogo' })
  @ApiResponse({
    status: 201,
    description: 'Catálogo creado correctamente.',
    type: CatalogResponseDto,
  })
  @Permissions(perm.advanced.administrator)
  create(@Body() dto: CreateCatalogDto) {
    return this.productCatalogService.create(dto)
  }

  @Delete(':catalogId')
  @ApiOperation({ summary: 'Borra un catálogo' })
  @ApiResponse({
    status: 200,
    description: 'Catalogo eliminado correctamente.',
    type: CatalogResponseDto,
  })
  @Permissions(perm.advanced.administrator)
  delete(@Param('catalogId', ParseIntPipe) catalogId: number) {
    return this.productCatalogService.delete(catalogId)
  }

  @Patch(':catalogId')
  @ApiOperation({ summary: 'Actualizar un catálogo' })
  @ApiResponse({
    status: 200,
    description: 'Catalogo actualizado correctamente.',
    type: CatalogResponseDto,
  })
  @Permissions(perm.advanced.administrator)
  update(@Param('catalogId') catalogId: number, @Body() dto: UpdateCatalogDto) {
    return this.productCatalogService.update(catalogId, dto)
  }
}

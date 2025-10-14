import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common'
import { Page } from '@/types/Page'
import { Supplier } from '@prisma/client'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { SupplierFiltersDto } from './dto/filters-supplier.dto'
import { AssignProductToSupplierDto } from './dto/assign-product.dto'
import { ProductSupplierService } from './productSupplier.service'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'


@ApiTags('Products Suppliers')
@Controller('/supplier')
@ApiBearerAuth()
export class ProductSupplierController {
  constructor(private readonly supplierService: ProductSupplierService) {}

  @Post()
  @ApiOperation({ summary: 'Crear proveedor' })
  @ApiResponse({ status: 201, description: 'Proveedor creado correctamente.' })
  create(@Body() dto: CreateSupplierDto) {
    return this.supplierService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los proveedores' })
  @ApiResponse({ status: 200, description: 'Lista de proveedores.' })
  findAll(@Query() filters: SupplierFiltersDto): Promise<Page<Supplier>> {
    return this.supplierService.findAll(filters)
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar proveedor' })
  @ApiResponse({ status: 200, description: 'Proveedor actualizado correctamente.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSupplierDto,
  ) {
    return this.supplierService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar proveedor' })
  @ApiResponse({ status: 200, description: 'Proveedor eliminado correctamente.' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.delete(id)
  }

  @Post('assign')
  @ApiOperation({ summary: 'Asignar producto a proveedor' })
  @ApiResponse({ status: 201, description: 'Producto asignado al proveedor.' })
  assign(@Body() dto: AssignProductToSupplierDto) {
    return this.supplierService.assignProduct(dto)
  }
}
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { SupplierFiltersDto } from './dto/supplier-filters.dto'
import { SupplierResponseDto } from './dto/supplier-response.dto'
import { ProductSupplierService } from './productSupplier.service'
import { SupplierPageResponseDto } from './dto/supplier-page-response.dto'
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger'
import {
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  Controller,
  ParseIntPipe,
} from '@nestjs/common'

@ApiTags('Products Suppliers')
@Controller('/supplier')
@ApiBearerAuth()
export class ProductSupplierController {
  constructor(private readonly supplierService: ProductSupplierService) {}

  @Post()
  @ApiOperation({ summary: 'Crear proveedor' })
  @ApiResponse({
    status: 201,
    description: 'Proveedor creado correctamente.',
    type: SupplierResponseDto,
  })
  create(@Body() dto: CreateSupplierDto) {
    return this.supplierService.create(dto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los proveedores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de proveedores.',
    type: SupplierPageResponseDto,
  })
  findAll(@Query() filters: SupplierFiltersDto) {
    return this.supplierService.findAll(filters)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar proveedor' })
  @ApiResponse({
    status: 200,
    description: 'Proveedor actualizado correctamente.',
    type: SupplierResponseDto,
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSupplierDto) {
    return this.supplierService.update(id, dto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar proveedor' })
  @ApiResponse({
    status: 200,
    description: 'Proveedor eliminado correctamente.',
    type: SupplierResponseDto,
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.supplierService.delete(id)
  }
}

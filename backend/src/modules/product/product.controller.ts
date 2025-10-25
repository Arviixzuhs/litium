import { Permissions, perm } from '@/common/decorators/permissions.decorator'
import { PermissionGuard } from '@/guards/permission.guard'
import { Page } from '@/types/Page'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FilesInterceptor } from '@nestjs/platform-express'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { diskStorage } from 'multer'
import { CreateProductDto } from './dto/create-product.dto'
import { ProductFilterDto } from './dto/product-filters.dto'
import { ProductPageResponseDto } from './dto/product-page-response.dto'
import { ProductResponseDto } from './dto/product-response.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './product.service'

@ApiTags('Products')
@Controller('product')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Permissions(perm.advanced.administrator)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      // 'images' es el nombre del campo en FormData, 10 es el maximo de archivos
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          const extension = file.originalname.split('.').pop()
          callback(null, `${uniqueSuffix}.${extension}`)
        },
      }),
    }),
  )
  create(
    @Body() dto: CreateProductDto,
    @UploadedFiles() images: Express.Multer.File[], // ahora sí recibirás un array
  ) {
    return this.productsService.create(dto, images)
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
  @Permissions(perm.advanced.administrator)
  @Patch(':id')
  @Permissions(perm.advanced.administrator)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          const extension = file.originalname.split('.').pop()
          callback(null, `${uniqueSuffix}.${extension}`)
        },
      }),
    }),
  )
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    return this.productsService.update(id, dto, images)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un producto' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Producto marcado como eliminado.',
    type: ProductResponseDto,
  })
  @Permissions(perm.advanced.administrator)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id)
  }
}

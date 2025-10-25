import { Page } from '@/types/Page'
import { Request } from 'express'
import { diskStorage } from 'multer'
import { ProductsService } from './product.service'
import { PermissionGuard } from '@/guards/permission.guard'
import { ProductFilterDto } from './dto/product-filters.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { FilesInterceptor } from '@nestjs/platform-express'
import { UpdateProductDto } from './dto/update-product.dto'
import { Permissions, perm } from '@/common/decorators/permissions.decorator'
import { ProductResponseDto } from './dto/product-response.dto'
import { ProductPageResponseDto } from './dto/product-page-response.dto'
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import {
  Req,
  Get,
  Body,
  Post,
  Patch,
  Query,
  Param,
  Delete,
  UseGuards,
  Controller,
  ParseIntPipe,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common'

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
  create(@Body() dto: CreateProductDto, @UploadedFiles() images: Express.Multer.File[]) {
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

  @Get('pending-comments/count')
  @ApiOperation({ summary: 'Cantidad de productos comprados que no han sido comentados' })
  @ApiResponse({
    status: 200,
    description: 'Cantidad de productos pendientes de comentario',
    schema: {
      example: { count: 5 },
    },
  })
  async getPendingCommentsCount(@Req() req: Request) {
    const count = await this.productsService.findUnreviewedProductsCount(req.user.userId)
    return { count }
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

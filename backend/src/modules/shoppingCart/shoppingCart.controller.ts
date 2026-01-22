import { Permissions, perm } from '@/common/decorators/permissions.decorator'
import { extname } from 'path'
import { PermissionGuard } from '@/guards/permission.guard'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseInterceptors,
  UseGuards,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ShoppingCartStatus } from '@prisma/client'
import { Request } from 'express'
import { diskStorage } from 'multer'
import { CheckoutDto } from './dto/checkout.dto'
import { CreateShoppingCartDto } from './dto/create-shoppingcart.dto'
import { ShoppingCartFiltersDto } from './dto/shoppingcart-filters.dto'
import { ShoppingCartService } from './shoppingCart.service'

import { FileInterceptor } from '@nestjs/platform-express'

@ApiTags('Shopping Cart')
@ApiBearerAuth()
@Controller('/shopping-cart')
@UseGuards(PermissionGuard)
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo carrito de compras' })
  @ApiResponse({ status: 201, description: 'Carrito creado correctamente.' })
  create(@Body() dto: CreateShoppingCartDto, @Req() req: Request) {
    return this.shoppingCartService.create(dto, req.user.userId)
  }

  @Delete(':shoppingCartId')
  @ApiOperation({ summary: 'Eliminar un carrito de compras' })
  @ApiResponse({ status: 200, description: 'Carrito eliminado correctamente.' })
  delete(@Param('shoppingCartId') shoppingCartId: number) {
    return this.shoppingCartService.delete(shoppingCartId)
  }

  @Get(':shoppingCartId')
  @ApiOperation({ summary: 'Obtener un carrito de compras por id' })
  findById(@Param('shoppingCartId') shoppingCartId: number) {
    return this.shoppingCartService.findBy(shoppingCartId)
  }

  @Put(':shoppingCartId/checkout')
  @ApiOperation({ summary: 'Confirmar checkout del carrito' })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, callback) => {
          const name = file.originalname.split('.')[0]
          const fileExtName = extname(file.originalname)
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.random().toString(36).substring(2, 15))
            .join('')
          callback(null, `${name}-${randomName}${fileExtName}`)
        },
      }),
    }),
  )
  async checkoutCart(
    @Param('shoppingCartId') shoppingCartId: number,
    @Body() body: any,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!body.recipient || !body.delivery || !body.payment) {
      throw new BadRequestException('Faltan campos obligatorios')
    }

    const dto: CheckoutDto = {
      recipient: JSON.parse(body.recipient),
      delivery: JSON.parse(body.delivery),
      payment: JSON.parse(body.payment),
    }

    return this.shoppingCartService.checkoutCart(shoppingCartId, dto, image)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener carritos de compras del usuario con filtros opcionales' })
  findAll(@Query() query: ShoppingCartFiltersDto, @Req() req: Request) {
    return this.shoppingCartService.findAll(query, req.user.userId)
  }

  @Patch(':shoppingCartId')
  @ApiOperation({ summary: 'Actualiza el estado de un carrito de compras' })
  updateShoppingCartStatus(
    @Param('shoppingCartId') shoppingCartId: number,
    @Query('status') status: ShoppingCartStatus,
  ) {
    return this.shoppingCartService.updateShoppingCartStatus(shoppingCartId, status)
  }

  @Post(':shoppingCartId/confirm')
  @ApiOperation({ summary: 'Confirmar pago de un carrito de compras' })
  @ApiResponse({ status: 200, description: 'Pago confirmado y carrito actualizado.' })
  @Permissions(perm.advanced.administrator)
  async confirmCart(@Param('shoppingCartId') shoppingCartId: number, @Req() req: Request) {
    return this.shoppingCartService.confirmPay(shoppingCartId, req.user.userId)
  }
}

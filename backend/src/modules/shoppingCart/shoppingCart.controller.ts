import { Request } from 'express'
import { ShoppingCartService } from './shoppingCart.service'
import { FindShoppingCartDto } from './dto/find-shoppingcart.dto'
import { CreateShoppingCartDto } from './dto/create-shoppingcart.dto'
import { EditProductQuantityDto } from './dto/edit-product-quantity.dto'
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Req, Get, Post, Body, Param, Query, Delete, Patch, Controller } from '@nestjs/common'

@ApiTags('Shopping Cart')
@ApiBearerAuth()
@Controller('/shopping-cart')
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
  delete(@Param('shoppingCartId') shoppingCartId: number, @Req() req: Request) {
    return this.shoppingCartService.delete(shoppingCartId, req.user.userId)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener carritos de compras del usuario con filtros opcionales' })
  findAll(@Query() query: FindShoppingCartDto, @Req() req: Request) {
    const { page, size } = query
    return this.shoppingCartService.findAll(req.user.userId, page, size)
  }

  @Patch('/product/quantity')
  @ApiOperation({ summary: 'Editar cantidad de un producto en el carrito' })
  @ApiResponse({ status: 200, description: 'Cantidad actualizada correctamente.' })
  editQuantity(@Body() dto: EditProductQuantityDto, @Req() req: Request) {
    return this.shoppingCartService.editProductQuantity(
      req.user.userId,
      dto.productId,
      dto.editType,
    )
  }

  @Delete('/product/:shoppingCartProductId')
  @ApiOperation({ summary: 'Eliminar un producto del carrito' })
  @ApiResponse({ status: 200, description: 'Producto eliminado correctamente.' })
  removeProduct(@Param('shoppingCartProductId') shoppingCartProductId: number) {
    return this.shoppingCartService.removeProduct(shoppingCartProductId)
  }

  @Patch('/confirm')
  @ApiOperation({ summary: 'Confirmar el carrito de compras actual del usuario' })
  @ApiResponse({ status: 200, description: 'Carrito confirmado correctamente.' })
  @ApiResponse({ status: 409, description: 'El carrito ya está confirmado.' })
  confirm(@Req() req: Request) {
    return this.shoppingCartService.confirmShoppingCart(req.user.userId)
  }
}

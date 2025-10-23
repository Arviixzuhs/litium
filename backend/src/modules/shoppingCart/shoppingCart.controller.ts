import { Request } from 'express'
import { ShoppingCartStatus } from '@prisma/client'
import { ShoppingCartService } from './shoppingCart.service'
import { CreateShoppingCartDto } from './dto/create-shoppingcart.dto'
import { ShoppingCartFiltersDto } from './dto/shoppingcart-filters.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req } from '@nestjs/common'

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
  delete(@Param('shoppingCartId') shoppingCartId: number) {
    return this.shoppingCartService.delete(shoppingCartId)
  }

  @Get(':shoppingCartId')
  @ApiOperation({ summary: 'Obtener un carrito de compras por id' })
  findById(@Param('shoppingCartId') shoppingCartId: number) {
    return this.shoppingCartService.findBy(shoppingCartId)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener carritos de compras del usuario con filtros opcionales' })
  findAll(@Query() query: ShoppingCartFiltersDto) {
    return this.shoppingCartService.findAll(query)
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
  async confirmCart(@Param('shoppingCartId') shoppingCartId: number, @Req() req: Request) {
    return this.shoppingCartService.confirmPay(shoppingCartId, req.user.userId)
  }
}

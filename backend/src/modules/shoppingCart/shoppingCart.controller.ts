import { Request } from 'express'
import { ShoppingCartService } from './shoppingCart.service'
import { CreateShoppingCartDto } from './dto/create-shoppingcart.dto'
import { ShoppingCartFiltersDto } from './dto/shoppingcart-filters.dto'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common'

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

  @Get(':shoppingCartId')
  @ApiOperation({ summary: 'Obtener un carrito de compras por id' })
  findById(@Param('shoppingCartId') shoppingCartId: number, @Req() req: Request) {
    return this.shoppingCartService.findBy(shoppingCartId, req.user.userId)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener carritos de compras del usuario con filtros opcionales' })
  findAll(@Query() query: ShoppingCartFiltersDto) {
    return this.shoppingCartService.findAll(query)
  }
}

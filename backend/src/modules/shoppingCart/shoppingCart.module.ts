import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { ShoppingCartService } from './shoppingCart.service'
import { ShoppingCartController } from './shoppingCart.controller'

@Module({
  exports: [],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, PrismaService, ProductsService],
})
export class ShoppingCartModule {}

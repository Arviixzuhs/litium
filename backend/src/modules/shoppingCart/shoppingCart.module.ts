import { Module } from '@nestjs/common'
import { PrismaModule } from '@/prisma/prisma.module'
import { ShoppingCartService } from './shoppingCart.service'
import { ShoppingCartController } from './shoppingCart.controller'
import { ProductsModule } from '../product/product.module'

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}

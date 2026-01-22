import { Module } from '@nestjs/common'
import { FileService } from '@/modules/file/file.service'
import { PrismaModule } from '@/prisma/prisma.module'
import { ProductsModule } from '@/modules/product/product.module'
import { InvoiceService } from '@/modules/invoice/invoice.service'
import { ShoppingCartService } from './shoppingCart.service'
import { ShoppingCartController } from './shoppingCart.controller'

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService, InvoiceService, FileService],
})
export class ShoppingCartModule {}

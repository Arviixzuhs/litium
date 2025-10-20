import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsModule } from '../product/product.module'
import { ProductCatalogService } from './productCatalog.service'
import { ProductCatalogController } from './productCatalog.controller'

@Module({
  exports: [],
  imports: [ProductsModule],
  controllers: [ProductCatalogController],
  providers: [ProductCatalogService, PrismaService],
})
export class ProductCatalogModule {}

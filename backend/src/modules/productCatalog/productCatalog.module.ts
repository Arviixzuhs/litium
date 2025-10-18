import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { ProductCatalogService } from './productCatalog.service'
import { ProductCatalogController } from './productCatalog.controller'

@Module({
  exports: [],
  controllers: [ProductCatalogController],
  providers: [ProductCatalogService, PrismaService, ProductsService],
})
export class ProductCatalogModule {}

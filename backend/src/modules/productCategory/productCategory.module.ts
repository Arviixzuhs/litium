import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '../product/product.service'
import { ProductCategoryService } from './productCategory.service'
import { ProductCategoryController } from './productCategory.controller'

@Module({
  exports: [],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, PrismaService, ProductsService],
})
export class ProductCategoryModule {}

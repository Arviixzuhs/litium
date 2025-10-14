import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '../product/product.service'
import { ProductSupplierService } from './productSupplier.service'
import { ProductSupplierController } from './productSupplier.controller'

@Module({
  exports: [],
  controllers: [ProductSupplierController],
  providers: [ProductSupplierService, PrismaService, ProductsService],
})
export class ProductSupplierModule {}
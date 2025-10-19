import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductSupplierService } from './productSupplier.service'
import { ProductSupplierController } from './productSupplier.controller'

@Module({
  exports: [],
  controllers: [ProductSupplierController],
  providers: [ProductSupplierService, PrismaService],
})
export class ProductSupplierModule {}

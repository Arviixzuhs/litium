import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from './product.service'
import { ProductsController } from './product.controller'

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
})
export class ProductsModule {}

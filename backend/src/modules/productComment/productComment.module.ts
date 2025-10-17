import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { ProductCommentService } from './productComment.service'
import { ProductCommentController } from './productComment.controller'

@Module({
  exports: [],
  controllers: [ProductCommentController],
  providers: [ProductCommentService, PrismaService, ProductsService],
})
export class ProductCommentModule {}

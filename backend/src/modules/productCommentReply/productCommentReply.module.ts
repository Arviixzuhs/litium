import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { ProductCommentService } from '@/modules/productComment/productComment.service'
import { ProductCommentReplyService } from './productCommentReply.service'
import { ProductCommentReplyController } from './productCommentReply.controller'

@Module({
  exports: [],
  controllers: [ProductCommentReplyController],
  providers: [ProductCommentReplyService, PrismaService, ProductCommentService, ProductsService],
})
export class ProductCommentReplyModule {}

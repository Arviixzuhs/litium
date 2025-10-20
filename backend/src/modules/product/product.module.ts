import { Module, forwardRef } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from './product.service'
import { ProductsController } from './product.controller'
import { ProductCommentModule } from '../productComment/productComment.module'

@Module({
  imports: [forwardRef(() => ProductCommentModule)],
  controllers: [ProductsController],
  providers: [ProductsService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule {}

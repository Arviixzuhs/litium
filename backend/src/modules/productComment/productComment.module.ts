import { Module, forwardRef } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductCommentService } from './productComment.service'
import { ProductCommentController } from './productComment.controller'
import { ProductsModule } from '../product/product.module'

@Module({
  imports: [forwardRef(() => ProductsModule)],
  controllers: [ProductCommentController],
  providers: [ProductCommentService, PrismaService],
  exports: [ProductCommentService], // <- exportar para que otros módulos puedan usarlo
})
export class ProductCommentModule {}

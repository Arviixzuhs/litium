import { FileService } from '@/modules/file/file.service'
import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from './product.service'
import { ProductsController } from './product.controller'
import { Module, forwardRef } from '@nestjs/common'
import { ProductCommentModule } from '@/modules/productComment/productComment.module'

@Module({
  imports: [forwardRef(() => ProductCommentModule)],
  controllers: [ProductsController],
  providers: [ProductsService, FileService, PrismaService],
  exports: [ProductsService],
})
export class ProductsModule {}

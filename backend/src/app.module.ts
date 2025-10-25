import { RoleModule } from '@/modules/role/role.module'
import { UserModule } from '@/modules/user/user.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { AppController } from '@/app.controller'
import { InvoiceModule } from '@/modules/invoice/invoice.module'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { ProductsModule } from '@/modules/product/product.module'
import { UserController } from '@/modules/user/user.controller'
import { RoleController } from '@/modules/role/role.controller'
import { MessagesModule } from '@/modules/messages/message.module'
import { InvoiceController } from '@/modules/invoice/invoice.controller'
import { ShoppingCartModule } from '@/modules/shoppingCart/shoppingCart.module'
import { ProductsController } from '@/modules/product/product.controller'
import { MessagesController } from '@/modules/messages/message.controller'
import { ProductCommentModule } from '@/modules/productComment/productComment.module'
import { ProductCatalogModule } from '@/modules/productCatalog/productCatalog.module'
import { ProductCategoryModule } from '@/modules/productCategory/productCategory.module'
import { ProductSupplierModule } from '@/modules/productSupplier/productSupplier.module'
import { ShoppingCartController } from '@/modules/shoppingCart/shoppingCart.controller'
import { RequestLoggerMiddleware } from '@/middlewares/request.logger.middleware'
import { ProductCommentController } from '@/modules/productComment/productComment.controller'
import { ProductCatalogController } from '@/modules/productCatalog/productCatalog.controller'
import { ProductCategoryController } from '@/modules/productCategory/productCategory.controller'
import { ProductCommentReplyModule } from '@/modules/productCommentReply/productCommentReply.module'
import { ProductSupplierController } from '@/modules/productSupplier/productSupplier.controller'
import { ProductCommentReplyController } from '@/modules/productCommentReply/productCommentReply.controller'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ServeStaticModule } from '@nestjs/serve-static'

import { FileModule } from './modules/file/file.module'
import { FileController } from './modules/file/file.controller'
import { join } from 'path'

@Module({
  imports: [
    AuthModule,
    RoleModule,
    UserModule,
    FileModule,
    PrismaModule,
    InvoiceModule,
    MessagesModule,
    ProductsModule,
    ShoppingCartModule,
    ProductCommentModule,
    ProductCatalogModule,
    ProductCategoryModule,
    ProductSupplierModule,
    ProductCommentReplyModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'), // <-- aquí
      serveRoot: '/uploads',
      serveStaticOptions: {
        setHeaders: (res, path) => {
          const ext = path.split('.').pop()?.toLowerCase()
          const mimeTypes: Record<string, string> = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            webp: 'image/webp',
            gif: 'image/gif',
          }
          if (ext && mimeTypes[ext]) {
            res.setHeader('Content-Type', mimeTypes[ext])
          }
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        FileController,
        RoleController,
        UserController,
        InvoiceController,
        ProductsController,
        MessagesController,
        ShoppingCartController,
        ProductCommentController,
        ProductCatalogController,
        ProductCategoryController,
        ProductSupplierController,
        ProductCommentReplyController,
      )
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}

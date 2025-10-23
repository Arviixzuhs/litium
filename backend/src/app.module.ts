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

@Module({
  imports: [
    AuthModule,
    RoleModule,
    UserModule,
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
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        RoleController,
        UserController,
        InvoiceController,
        ProductsController,
        MessagesController,
        ShoppingCartController,
        ProductCommentController,
        ProductCatalogController,
        ProductCategoryController,
        ProductCommentReplyController,
        ProductSupplierController,
      )
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}

import { UserModule } from '@/modules/user/user.module'
import { AuthModule } from '@/modules/auth/auth.module'
import { PrismaModule } from '@/prisma/prisma.module'
import { AppController } from '@/app.controller'
import { AuthMiddleware } from '@/middlewares/auth.middleware'
import { ProductsModule } from '@/modules/product/product.module'
import { UserController } from '@/modules/user/user.controller'
import { MessagesModule } from '@/modules/messages/message.module'
import { ShoppingCartModule } from '@/modules/shoppingCart/shoppingCart.module'
import { ProductsController } from '@/modules/product/product.controller'
import { ProductCommentModule } from '@/modules/productComment/productComment.module'
import { ProductCatalogModule } from '@/modules/productCatalog/productCatalog.module'
import { ProductCategoryModule } from '@/modules/productCategory/productCategory.module'
import { ShoppingCartController } from '@/modules/shoppingCart/shoppingCart.controller'
import { RequestLoggerMiddleware } from '@/middlewares/request.logger.middleware'
import { ProductCommentController } from '@/modules/productComment/productComment.controller'
import { ProductCatalogController } from '@/modules/productCatalog/productCatalog.controller'
import { ProductCategoryController } from '@/modules/productCategory/productCategory.controller'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    MessagesModule,
    ProductsModule,
    ShoppingCartModule,
    ProductCommentModule,
    ProductCatalogModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        UserController,
        ProductsController,
        ShoppingCartController,
        ProductCommentController,
        ProductCatalogController,
        ProductCategoryController,
      )
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}

import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { EmailModule } from './modules/email/email.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { AppController } from 'src/app.controller'
import { AuthMiddleware } from 'src/middlewares/auth.middleware'
import { ProductsModule } from './modules/product/product.module'
import { UserController } from './modules/user/user.controller'
import { EmailController } from './modules/email/email.controller'
import { ProductsController } from './modules/product/product.controller'
import { ProductCommentModule } from './modules/productComment/productComment.module'
import { ProductCategoryModule } from './modules/productCategory/productCategory.module'
import { RequestLoggerMiddleware } from './middlewares/request.logger.middleware'
import { ProductCommentController } from './modules/productComment/productComment.controller'
import { ProductCategoryController } from './modules/productCategory/productCategory.controller'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    EmailModule,
    ProductsModule,
    ProductCommentModule,
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
        EmailController,
        ProductsController,
        ProductCommentController,
        ProductCategoryController,
      )
    consumer.apply(RequestLoggerMiddleware).forRoutes('*')
  }
}

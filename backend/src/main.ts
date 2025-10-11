import { config } from 'dotenv'
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module'
import { ServerMode } from './types/server.mode'
import { NestFactory } from '@nestjs/core'
import ValidationPipe from './pipes/validation.pipe'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  if (process.env.SERVER_MODE === ServerMode.DEV) {
    const config = new DocumentBuilder()
      .setTitle('Swagger')
      .setDescription('The example API description')
      .addBearerAuth()
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }

  app.useGlobalPipes(ValidationPipe)

  const { HOST, PORT } = process.env
  await app.listen(PORT).then(() => {
    Logger.log(`Server listening on http://${HOST}:${PORT}`, 'NestApplication')
  })
}
bootstrap()

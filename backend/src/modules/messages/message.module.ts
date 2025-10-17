import { Module } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { MessagesGateway } from './message.gateway'
import { MessagesService } from './message.service'
import { MessagesController } from './message.controller'

@Module({
  controllers: [MessagesController],
  providers: [MessagesGateway, MessagesService, PrismaService],
})
export class MessagesModule {}

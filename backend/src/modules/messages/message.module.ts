import { Module } from '@nestjs/common'
import { MessagesGateway } from './message.gateway'
import { MessagesService } from './message.service'
import { PrismaService } from '@/prisma/prisma.service'

@Module({
  providers: [MessagesGateway, MessagesService, PrismaService],
})
export class MessagesModule {}

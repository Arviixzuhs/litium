import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateMessageDto } from './dto/create-message.dto'

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        userId: dto.userId,
        message: dto.message,
        senderId: dto.senderId,
        shoppingCartId: dto.shoppingCartId,
      },
      include: {
        sender: true,
      },
    })
  }

  async editMessage(messageId: number, newContent: string) {
    const message = await this.prisma.message.findUnique({
      where: {
        id: messageId,
        isDeleted: false,
      },
    })

    if (!message) {
      throw new NotFoundException('Mensaje no encontrado o ya eliminado')
    }

    return this.prisma.message.update({
      where: { id: messageId },
      data: {
        message: newContent,
        isEdited: true,
        editedAt: new Date(),
      },
    })
  }

  async deleteMessage(messageId: number) {
    const message = await this.prisma.message.findUnique({
      where: {
        id: messageId,
        isDeleted: false,
      },
    })

    if (!message) {
      throw new NotFoundException('Mensaje no encontrado o ya eliminado')
    }

    return this.prisma.message.update({
      where: { id: messageId },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })
  }

  async findByCart(cartId: number) {
    return this.prisma.message.findMany({
      where: {
        shoppingCartId: cartId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        sender: true,
      },
    })
  }
}

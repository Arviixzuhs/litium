import { PrismaService } from '@/prisma/prisma.service'
import { CreateReplyDto } from './dto/create-reply.dto'
import { ProductCommentService } from '@/modules/productComment/productComment.service'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ProductCommentReplyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productCommentService: ProductCommentService,
  ) {}

  async findBy(id: number) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id,
        isDeleted: false,
      },
    })

    if (!comment) throw new NotFoundException('Comentario no encontrado')
    return comment
  }

  async create(dto: CreateReplyDto, userId: number) {
    await this.productCommentService.findBy(dto.commentId)

    return this.prisma.reply.create({
      data: {
        userId,
        comment: dto.comment,
        commentId: dto.commentId,
      },
    })
  }
}

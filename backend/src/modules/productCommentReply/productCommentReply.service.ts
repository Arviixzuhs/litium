import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateReplyDto } from './dto/create-reply.dto'
import { ProductCommentService } from '@/modules/productComment/productComment.service'

@Injectable()
export class ProductCommentReplyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productCommentService: ProductCommentService,
  ) {}

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

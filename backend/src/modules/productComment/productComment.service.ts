import { PrismaService } from '@/prisma/prisma.service'
import { ProductsService } from '@/modules/product/product.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ProductCommentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductsService,
  ) {}

  async findByProductId(id: number) {
    await this.productService.findOne(id)

    return this.prisma.comment.findMany({
      where: {
        product: {
          id,
        },
      },
    })
  }

  async findBy(id: number) {
    const comment = await this.prisma.comment.findFirst({
      where: {
        id,
      },
    })

    if (!comment) throw new NotFoundException('Comentario no encontrado')
    return comment
  }

  async create(dto: CreateCommentDto, userId: number) {
    await this.productService.findOne(dto.productId)

    return this.prisma.comment.create({
      data: {
        userId,
        comment: dto.comment,
        productId: dto.productId,
      },
    })
  }

  async delete(commentId: number, userId: number) {
    const comment = await this.findBy(commentId)

    if (comment.userId !== userId) {
      throw new HttpException('Solo el autor del comentario lo puede eliminar', HttpStatus.CONFLICT)
    }

    return this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        isDeleted: true,
      },
    })
  }
}

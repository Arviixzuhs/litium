import { Page } from '@/types/Page'
import { Comment } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { CommentFiltersDto } from './dto/comment-filters.dto'
import { ProductsService } from '@/modules/product/product.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  ProductCommentSpecificationBuild,
  ProductCommentSpecificationBuilder,
} from './repositories/productComment.specificationBuilder'

@Injectable()
export class ProductCommentService {
  constructor(
    private readonly prisma: PrismaService,

    @Inject(forwardRef(() => ProductsService))
    private readonly productService: ProductsService,
  ) {}

  async findAll(filters: CommentFiltersDto) {
    await this.productService.findBy(filters.productId)

    const query = new ProductCommentSpecificationBuilder()
      .withProductId(filters.productId)
      .withIsDeleted(false)
      .withInclude({
        user: true,
        replies: {
          include: {
            user: true,
          },
        },
      })
      .withPagination(filters.page, filters.size)
      .withOrderBy({ createdAt: 'desc' })
      .build()

    return this.page(query, filters)
  }

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

  async create(dto: CreateCommentDto, userId: number) {
    await this.productService.findBy(dto.productId)

    return this.prisma.comment.create({
      data: {
        userId,
        comment: dto.comment,
        productId: dto.productId,
        qualification: dto.qualification,
      },
    })
  }

  async delete(commentId: number, userId: number) {
    const comment = await this.findBy(commentId)

    if (comment.userId !== userId) {
      throw new HttpException(
        'Solo el autor del comentario lo puede eliminar',
        HttpStatus.UNAUTHORIZED,
      )
    }

    return this.prisma.comment.update({
      where: {
        id: commentId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })
  }

  async calcQualification(productId: number): Promise<number> {
    const avgQualification = await this.prisma.comment.aggregate({
      where: { productId },
      _avg: { qualification: true },
    })

    return avgQualification._avg.qualification ?? 0
  }

  private async page(
    query: ProductCommentSpecificationBuild,
    filters: CommentFiltersDto,
  ): Promise<Page<Comment>> {
    const [categories, totalItems] = await this.prisma.$transaction([
      this.prisma.comment.findMany(query),
      this.prisma.comment.count({
        where: query.where,
      }),
    ])

    const page = filters.page ?? 1
    const size = filters.size ?? 10
    const totalPages = Math.ceil(totalItems / size)

    return {
      content: categories,
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}

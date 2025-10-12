import { Prisma } from '@prisma/client'

export class ProductCommentSpecificationBuilder {
  private where: Prisma.CommentWhereInput = {}
  private skip?: number
  private take?: number
  private orderBy?: Prisma.CommentOrderByWithRelationInput

  withProductId(productId?: number) {
    if (productId) {
      this.where.productId = productId
    }
    return this
  }

  withIsDeleted(isDeleted?: boolean) {
    if (isDeleted !== undefined) {
      this.where.isDeleted = isDeleted
    }
    return this
  }

  withPagination(page?: number, pageSize: number = 10) {
    if (page !== undefined && page >= 0) {
      this.skip = page * pageSize
      this.take = pageSize
    }
    return this
  }

  withOrderBy(orderBy?: Prisma.CommentOrderByWithRelationInput) {
    if (orderBy) {
      this.orderBy = orderBy
    }
    return this
  }

  build(): {
    where: Prisma.CommentWhereInput
    skip?: number
    take?: number
    orderBy?: Prisma.CommentOrderByWithRelationInput
  } {
    return {
      where: this.where,
      skip: this.skip,
      take: this.take,
      orderBy: this.orderBy,
    }
  }
}

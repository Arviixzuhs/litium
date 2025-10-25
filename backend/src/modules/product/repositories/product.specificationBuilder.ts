import { Prisma } from '@prisma/client'

export interface ProductSpecificationBuild {
  where: Prisma.ProductWhereInput
  skip?: number
  take?: number
  include?: Prisma.ProductInclude
  orderBy?: Prisma.ProductOrderByWithRelationInput
}

export class ProductSpecificationBuilder {
  private where: Prisma.ProductWhereInput = {}
  private skip?: number
  private take?: number
  private include?: Prisma.ProductInclude
  private orderBy?: Prisma.ProductOrderByWithRelationInput

  withName(name?: string) {
    if (name !== undefined) {
      this.where.name = { contains: name }
    }

    return this
  }

  withCategoryIds(categoryIds?: number[]) {
    if (categoryIds && categoryIds.length > 0) {
      this.where.categories = {
        some: {
          category: {
            id: { in: categoryIds },
            isDeleted: false,
          },
        },
      }
    }
    return this
  }

  withCatalogId(catalogId?: number) {
    if (catalogId) {
      this.where.product_x_catalog = {
        some: {
          catalogId: catalogId,
        },
      }
    }

    return this
  }

  withNotInCatalogId(catalogId?: number) {
    if (catalogId) {
      this.where.product_x_catalog = {
        none: {
          id: catalogId,
        },
      }
    }

    return this
  }

  withPriceBetween(min?: number, max?: number) {
    if (min !== undefined || max !== undefined) {
      this.where.price = {
        ...(min !== undefined && { gte: min }),
        ...(max !== undefined && { lte: max }),
      }
    }

    return this
  }

  withShow(show?: string) {
    if (show) {
      this.where.show = show
    }

    return this
  }

  withCreatedAtBetween(fromDate?: string, toDate?: string) {
    if (fromDate || toDate) {
      this.where.createdAt = {
        ...(fromDate && { gte: new Date(fromDate) }),
        ...(toDate && { lte: new Date(toDate) }),
      }
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

  withOrderBy(orderBy?: Prisma.ProductOrderByWithRelationInput) {
    if (orderBy) {
      this.orderBy = orderBy
    }
    return this
  }

  withInclude(include?: Prisma.ProductInclude) {
    if (include) {
      this.include = include
    }
    return this
  }

  withCategoryName(categoryName?: string) {
    if (categoryName) {
      this.where.categories = {
        some: {
          category: {
            name: { contains: categoryName },
            isDeleted: false,
          },
        },
      }
    }

    return this
  }

  build(): ProductSpecificationBuild {
    return {
      where: this.where,
      skip: this.skip,
      take: this.take,
      include: this.include,
      orderBy: this.orderBy,
    }
  }
}

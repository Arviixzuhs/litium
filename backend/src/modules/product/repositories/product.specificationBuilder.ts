import { Prisma } from '@prisma/client'

export class ProductSpecificationBuilder {
  private where: Prisma.ProductWhereInput = {}

  withName(name?: string) {
    if (name) {
      this.where.name = { contains: name }
    }

    return this
  }

  withCatalogId(catalogId?: number) {
    if (catalogId) {
      this.where.catalogId = catalogId
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

  build(): Prisma.ProductWhereInput {
    return this.where
  }
}

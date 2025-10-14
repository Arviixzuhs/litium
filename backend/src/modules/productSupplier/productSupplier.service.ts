import { Page } from '@/types/Page'
import { Supplier } from '@prisma/client'
import { PrismaService } from '@/prisma/prisma.service'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { SupplierFiltersDto } from './dto/filters-supplier.dto'
import { ProductsService } from '@/modules/product/product.service'
import { AssignProductToSupplierDto } from './dto/assign-product.dto'
import {
  ProductSupplierSpecificationBuild,
  ProductSupplierSpecificationBuilder,
} from './repositories/productsupplier.specificationBuilder'

@Injectable()
export class ProductSupplierService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductsService,
  ) {}

  async findAll(filters: SupplierFiltersDto): Promise<Page<Supplier>> {
    const query = new ProductSupplierSpecificationBuilder()
      .withName(filters.name)
      .withIsDeleted(false)
      .withOrderBy({ createdAt: 'desc' })
      .withPagination(filters.page, filters.size)
      .build()

    return this.page(query, filters)
  }

  create(dto: CreateSupplierDto) {
    return this.prisma.supplier.create({
      data: dto,
    })
  }

  async assignProduct(dto: AssignProductToSupplierDto) {
    await this.productService.findBy(dto.productId)
    await this.findBy(dto.supplierId)

    return this.prisma.product_x_Supplier.create({
      data: {
        supplierId: dto.supplierId,
        productId: dto.productId,
      },
    })
  }

  async findBy(id: number) {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    })
    if (!supplier) throw new NotFoundException('Proveedor no encontrado')
    return supplier
  }

  async update(supplierId: number, dto: UpdateSupplierDto) {
    await this.findBy(supplierId)
    return this.prisma.supplier.update({
      where: {
        id: supplierId,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    })
  }

  async delete(supplierId: number) {
    await this.findBy(supplierId)
    return this.prisma.supplier.update({
      where: {
        id: supplierId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })
  }

  private async page(
    query: ProductSupplierSpecificationBuild,
    filters: SupplierFiltersDto,
  ): Promise<Page<Supplier>> {
    const [suppliers, totalItems] = await this.prisma.$transaction([
      this.prisma.supplier.findMany(query),
      this.prisma.supplier.count({
        where: query.where,
      }),
    ])

    const page = filters.page ?? 1
    const size = filters.size ?? 10
    const totalPages = Math.ceil(totalItems / size)

    return {
      content: suppliers,
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}

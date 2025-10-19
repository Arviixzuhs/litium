import { Page } from '@/types/Page'
import { PrismaService } from '@/prisma/prisma.service'
import { SupplierMapper } from './mapper/productSupplier.mapper'
import { ProductsService } from '@/modules/product/product.service'
import { CreateSupplierDto } from './dto/create-supplier.dto'
import { UpdateSupplierDto } from './dto/update-supplier.dto'
import { SupplierFiltersDto } from './dto/supplier-filters.dto'
import { SupplierResponseDto } from './dto/supplier.dto'
import { AssignProductToSupplierDto } from './dto/assign-product.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
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

  private supplierMapper = new SupplierMapper()

  async findAll(filters: SupplierFiltersDto) {
    const query = new ProductSupplierSpecificationBuilder()
      .withName(filters.name)
      .withIsDeleted(false)
      .withOrderBy({ createdAt: 'desc' })
      .withPagination(filters.page, filters.size)
      .build()

    return this.page(query, filters)
  }

  async create(dto: CreateSupplierDto) {
    const created = await this.prisma.supplier.create({
      data: dto,
    })

    return this.supplierMapper.modelToDto(created)
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

  async findBy(id: number): Promise<SupplierResponseDto> {
    const supplier = await this.prisma.supplier.findUnique({
      where: { id },
    })
    if (!supplier) throw new NotFoundException('Proveedor no encontrado')

    return this.supplierMapper.modelToDto(supplier)
  }

  async update(supplierId: number, dto: UpdateSupplierDto): Promise<SupplierResponseDto> {
    await this.findBy(supplierId)

    const updated = await this.prisma.supplier.update({
      where: {
        id: supplierId,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    })

    return this.supplierMapper.modelToDto(updated)
  }

  async delete(supplierId: number) {
    await this.findBy(supplierId)

    const deleted = await this.prisma.supplier.update({
      where: {
        id: supplierId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    })

    return this.supplierMapper.modelToDto(deleted)
  }

  private async page(
    query: ProductSupplierSpecificationBuild,
    filters: SupplierFiltersDto,
  ): Promise<Page<SupplierResponseDto>> {
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
      content: this.supplierMapper.modelsToDtos(suppliers),
      totalPages,
      totalItems,
      currentPage: page,
      rowsPerPage: size,
    }
  }
}

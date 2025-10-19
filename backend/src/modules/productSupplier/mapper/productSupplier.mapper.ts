import { Supplier } from '@prisma/client'
import { BaseMapper } from '@/common/utils/base.mapper'
import { SupplierResponseDto } from '../dto/supplier-response.dto'

export class SupplierMapper extends BaseMapper<Supplier, SupplierResponseDto> {
  modelToDto(model: Supplier): SupplierResponseDto {
    return {
      id: model.id,
      name: model.name,
      phone: model.phone,
      email: model.email,
      address: model.address,
      createdAt: model.createdAt.toISOString(),
    }
  }
}

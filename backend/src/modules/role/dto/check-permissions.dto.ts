import { ApiProperty } from '@nestjs/swagger'
import { IsArray } from 'class-validator'

export class CheckPermissionsDto {
  @ApiProperty({
    description: 'Lista de permisos a verificar',
    example: ['VIEW_PROJECT_SECTION', 'VIEW_INVENTORY_SECTION'],
  })
  @IsArray()
  permissions: string[]
}

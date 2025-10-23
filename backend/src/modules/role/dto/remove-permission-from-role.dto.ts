import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsNotEmpty } from 'class-validator'

export class RemovePermissionFromRoleDto {
  @ApiProperty({
    description: 'The name of the permission to remove',
    example: 'CREATE_USER',
  })
  @IsString()
  @IsNotEmpty()
  permissionName: string

  @ApiProperty({
    description: 'ID of the role from which the permission will be removed',
    example: 2,
  })
  @IsInt()
  roleId: number
}

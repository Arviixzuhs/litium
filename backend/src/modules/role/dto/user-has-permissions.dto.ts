import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class UserHasPermissionsDto {
  @ApiProperty({
    description: 'The name of the permission to check',
    example: 'CREATE_USER',
  })
  @IsString()
  @IsNotEmpty()
  permissionName: string
}

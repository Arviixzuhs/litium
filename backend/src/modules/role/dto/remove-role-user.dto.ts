import { IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RemoveRoleToUserDto {
  @ApiProperty({
    description: 'ID of the user to remove the role to',
    example: 1,
  })
  @IsInt()
  userId: number

  @ApiProperty({
    description: 'ID of the role to remove to the user',
    example: 1,
  })
  @IsInt()
  roleId: number
}

import { IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class AssignRoleToUserDto {
  @ApiProperty({
    description: 'ID of the user to assign the role to',
    example: 1,
  })
  @IsInt()
  userId: number

  @ApiProperty({
    description: 'ID of the role to assign to the user',
    example: 1,
  })
  @IsInt()
  roleId: number
}

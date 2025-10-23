import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class EditRoleDto {
  @ApiProperty({
    description: 'The new name for the role',
    example: 'User',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}

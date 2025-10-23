import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'Admin',
  })
  @IsString()
  @IsNotEmpty()
  name: string
}

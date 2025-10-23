import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsNotEmpty } from 'class-validator'

export class AddPermissionToRoleDto {
  @ApiProperty({
    description: 'El nombre del permiso para agregar',
    example: 'CREATE_USER',
  })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({
    description: 'ID del rol al que se agregará el permiso',
    example: 2,
  })
  @IsNotEmpty({ message: 'El id del nol no puede estar vacío' })
  @IsInt()
  roleId: number
}

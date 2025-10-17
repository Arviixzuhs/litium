import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator'

export class CreateReplyDto {
  @ApiProperty({
    description: 'Contenido del comentario o respuesta',
    example: 'Estoy de acuerdo con tu punto.',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  comment: string

  @ApiPropertyOptional({
    description: 'ID de la respuesta padre, si esta es una respuesta a otra respuesta',
    example: 17,
  })
  @IsOptional()
  @IsInt()
  replyId?: number

  @ApiProperty({
    description: 'ID del comentario original al que se responde',
    example: 5,
  })
  @IsInt()
  commentId: number
}

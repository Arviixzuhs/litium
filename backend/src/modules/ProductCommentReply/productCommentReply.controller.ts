import { Request } from 'express'
import { CreateReplyDto } from './dto/create-reply.dto'
import { ProductCommentReplyService } from './productCommentReply.service'
import { Body, Controller, Post, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Reply comment')
@Controller('/reply')
@ApiBearerAuth()
export class ProductCommentReplyController {
  constructor(private readonly productCommentReplyService: ProductCommentReplyService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva respuesta a un comentario' })
  @ApiResponse({ status: 201, description: 'Respuesta creada correctamente.' })
  create(@Body() dto: CreateReplyDto, @Req() req: Request) {
    return this.productCommentReplyService.create(dto, req.user.userId)
  }
}

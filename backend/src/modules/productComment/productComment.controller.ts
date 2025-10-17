import { Request } from 'express'
import { FindCommentsDto } from './dto/find-comments.dto'
import { CreateCommentDto } from './dto/create-comment.dto'
import { ProductCommentService } from './productComment.service'
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Req, Get, Body, Post, Param, Delete, Controller, Query } from '@nestjs/common'

@ApiTags('Products Comment')
@Controller('/comment')
@ApiBearerAuth()
export class ProductCommentController {
  constructor(private readonly productCommentService: ProductCommentService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({ status: 201, description: 'Comentario creado correctamente.' })
  create(@Body() dto: CreateCommentDto, @Req() req: Request) {
    return this.productCommentService.create(dto, req.user.userId)
  }

  @Delete(':commentId')
  @ApiOperation({ summary: 'Borra un comentario' })
  @ApiResponse({ status: 200, description: 'Comentario eliminado correctamente.' })
  delete(@Param('commentId') commentId: number, @Req() req: Request) {
    return this.productCommentService.delete(commentId, req.user.userId)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener comentarios de un producto con filtros opcionales' })
  findByProductId(@Query() query: FindCommentsDto) {
    return this.productCommentService.findAll(query)
  }
}

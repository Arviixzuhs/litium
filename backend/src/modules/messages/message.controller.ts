import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common'
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { MessagesService } from './message.service'

@ApiTags('Mensajes')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('cart/:cartId')
  @ApiOperation({ summary: 'Obtener todos los mensajes de un carrito de compras' })
  @ApiParam({ name: 'cartId', type: Number, description: 'ID del carrito de compras' })
  async findByCart(@Param('cartId', ParseIntPipe) cartId: number) {
    const messages = await this.messagesService.findByCart(cartId)
    if (!messages || messages.length === 0) {
      throw new NotFoundException('No se encontraron mensajes para este carrito')
    }
    return messages
  }
}

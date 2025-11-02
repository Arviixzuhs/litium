import {
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  WebSocketGateway,
  SubscribeMessage,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { MessagesService } from './message.service'
import { CreateMessageDto } from './dto/create-message.dto'
import { UsePipes, ValidationPipe } from '@nestjs/common'

@WebSocketGateway({ cors: true })
@UsePipes(new ValidationPipe({ transform: true }))
export class MessagesGateway {
  @WebSocketServer()
  server: Server

  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() dto: CreateMessageDto,
    @ConnectedSocket() _client: Socket,
  ) {
    const message = await this.messagesService.create(dto)
    this.server.to(`cart-${dto.shoppingCartId}`).emit('newMessage', message)
    return message
  }

  @SubscribeMessage('joinCart')
  handleJoinCart(@MessageBody() cartId: number, @ConnectedSocket() client: Socket) {
    client.join(`cart-${cartId}`)
  }

  @SubscribeMessage('leaveCart')
  handleLeaveCart(@MessageBody() cartId: number, @ConnectedSocket() client: Socket) {
    client.leave(`cart-${cartId}`)
  }

  @SubscribeMessage('editMessage')
  async handleEditMessage(
    @MessageBody() data: { messageId: number; newContent: string },
    @ConnectedSocket() _client: Socket,
  ) {
    const updated = await this.messagesService.editMessage(data.messageId, data.newContent)
    this.server.to(`cart-${updated.shoppingCartId}`).emit('messageEdited', updated)
    return updated
  }

  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(@MessageBody() messageId: number, @ConnectedSocket() _client: Socket) {
    const deleted = await this.messagesService.deleteMessage(messageId)
    this.server.to(`cart-${deleted.shoppingCartId}`).emit('messageDeleted', { id: deleted.id })
    return deleted
  }

  @SubscribeMessage('confirm')
  async confirmOrder(
    @MessageBody() data: { invoiceId: number; cartId: number },
    @ConnectedSocket() _client: Socket,
  ) {
    const { invoiceId, cartId } = data
    this.server.to(`cart-${cartId}`).emit('orderConfirmed', invoiceId)
  }
}

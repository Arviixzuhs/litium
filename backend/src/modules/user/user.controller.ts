import { Request } from 'express'
import { UserService } from './user.service'
import { Controller, Get, Req } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

@ApiTags('user')
@Controller('/user')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/')
  getHello(@Req() req: Request): Promise<String> {
    return this.appService.getHello(req.user.userId)
  }
}

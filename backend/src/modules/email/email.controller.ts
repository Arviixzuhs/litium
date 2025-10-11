import { EmailService } from './email.service'
import { PermissionGuard } from 'src/guards/permission.guard'
import { SendMassiveEmailDto } from './dto/send-masive-email.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Post, UseGuards } from '@nestjs/common'

@ApiTags('email')
@Controller('/email')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send-massive')
  async sendMassiveEmails(@Body() body: SendMassiveEmailDto): Promise<string> {
    const { content, subject } = body
    return this.emailService.setMasiveEmails(content, subject)
  }
}

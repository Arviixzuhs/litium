import { IsNotEmpty, IsString } from 'class-validator'

export class SendMassiveEmailDto {
  @IsNotEmpty()
  @IsString()
  subject: string

  @IsNotEmpty()
  @IsString()
  content: string
}

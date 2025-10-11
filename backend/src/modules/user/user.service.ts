import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getHello(id: number): Promise<String> {
    const user: User = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND)
    }

    return `Hola ${user.name}`
  }
}

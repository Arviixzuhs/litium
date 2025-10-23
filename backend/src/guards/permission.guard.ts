import { Reflector } from '@nestjs/core'
import { PrismaService } from '@/prisma/prisma.service'
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const userId = request?.user?.userId
    const requiredPermissions = this.reflector.get<string[]>('permissions', context.getHandler())

    if (!requiredPermissions || !userId) return true

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        roles: {
          some: {
            role: {
              permissions: {
                some: {
                  OR: [
                    { name: '*' },
                    ...requiredPermissions.map((permission) => ({ name: permission })),
                  ],
                },
              },
            },
          },
        },
      },
    })

    if (!user) throw new ForbiddenException('You do not have permission to access this resource.')

    return true
  }
}

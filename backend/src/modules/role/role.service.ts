import { PrismaService } from '@/prisma/prisma.service'
import { Prisma, Role, RolePermission, RoleUser } from '@prisma/client'
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findRoleById(roleId: number): Promise<Role> {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } })
    if (!role) throw new NotFoundException('Role not found.')
    return role
  }

  async createRole(name: string): Promise<Role> {
    try {
      return this.prisma.role.create({
        data: { name },
      })
    } catch (error) {
      throw new HttpException('An error occurred.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteRole(id: number): Promise<Role> {
    await this.findRoleById(id)
    return this.prisma.role.delete({
      where: { id },
    })
  }

  async loadAllRoles(): Promise<Role[]> {
    const roles = await this.prisma.role.findMany({
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                lastName: true,
              },
            },
          },
        },
        permissions: true,
      },
    })

    return roles.map((role) => ({
      ...role,
      users: role.users.map((userRelation) => userRelation.user),
    }))
  }

  async editRole(id: number, name: string): Promise<Role> {
    await this.findRoleById(id)

    return this.prisma.role.update({
      where: { id },
      data: { name },
    })
  }

  async assignRoleToUser(userId: number, roleId: number): Promise<RoleUser> {
    await this.findRoleById(roleId)

    const hasRole = await this.userHasRole(userId, roleId)
    if (hasRole)
      throw new HttpException('User already has this role assigned.', HttpStatus.CONFLICT)

    return this.prisma.roleUser.create({
      data: {
        userId,
        roleId,
      },
    })
  }

  async removeRoleFromUser(roleId: number, userId: number): Promise<Prisma.BatchPayload> {
    const hasRole = await this.userHasRole(userId, roleId)
    if (!hasRole) throw new NotFoundException('User does not have this role assigned.')

    return this.prisma.roleUser.deleteMany({
      where: {
        userId,
        roleId,
      },
    })
  }

  async addPermissionToRole(roleId: number, name: string): Promise<RolePermission> {
    const roleHasPermission = await this.findRoleByIdAndPermissionName(roleId, name)
    if (roleHasPermission)
      throw new HttpException('Role already has this permission assigned.', HttpStatus.CONFLICT)

    return this.prisma.rolePermission.create({
      data: {
        name,
        roleId,
      },
    })
  }

  async removePermissionFromRole(roleId: number, name: string): Promise<Prisma.BatchPayload> {
    const roleHasPermission = await this.findRoleByIdAndPermissionName(roleId, name)
    if (!roleHasPermission)
      throw new HttpException('Role does not have this permission assigned.', HttpStatus.CONFLICT)

    return this.prisma.rolePermission.deleteMany({
      where: {
        name,
        roleId,
      },
    })
  }

  async userHasPermission(
    userId: number,
    permissionName: string,
  ): Promise<{
    hasPermissions: boolean
  }> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        roles: {
          some: {
            role: {
              permissions: {
                some: {
                  OR: [{ name: '*' }, { name: permissionName }],
                },
              },
            },
          },
        },
      },
    })

    return { hasPermissions: !!user }
  }

  private async userHasRole(userId: number, roleId: number): Promise<RoleUser> {
    return this.prisma.roleUser.findFirst({
      where: {
        userId,
        roleId,
      },
    })
  }

  private async findRoleByIdAndPermissionName(
    roleId: number,
    name: string,
  ): Promise<RolePermission> {
    await this.findRoleById(roleId)
    return this.prisma.rolePermission.findFirst({
      where: {
        name,
        roleId,
      },
    })
  }

  async checkUserPermissions(
    userId: number,
    permissions: string[],
  ): Promise<{ [key: string]: boolean }> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: true,
              },
            },
          },
        },
      },
    })

    if (!user) return permissions.reduce((acc, perm) => ({ ...acc, [perm]: false }), {})

    const userPermissions = new Set(
      user.roles.flatMap((role) => role.role.permissions.map((p) => p.name)),
    )

    return permissions.reduce(
      (acc, perm) => ({
        ...acc,
        [perm]: userPermissions.has('*') || userPermissions.has(perm),
      }),
      {},
    )
  }
}

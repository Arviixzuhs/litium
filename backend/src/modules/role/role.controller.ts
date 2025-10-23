import { Request } from 'express'
import { RoleService } from './role.service'
import { EditRoleDto } from './dto/edit-role.dto'
import { CreateRoleDto } from './dto/create-role.dto'
import { PermissionGuard } from '@/guards/permission.guard'
import { Permissions, perm } from '@/common/decorators/permissions.decorator'
import { AssignRoleToUserDto } from './dto/assing-role-to-user.dto'
import { RemoveRoleToUserDto } from './dto/remove-role-user.dto'
import { CheckPermissionsDto } from './dto/check-permissions.dto'
import { UserHasPermissionsDto } from './dto/user-has-permissions.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AddPermissionToRoleDto } from './dto/add-permission-to-role.dto'
import { RemovePermissionFromRoleDto } from './dto/remove-permission-from-role.dto'
import { Prisma, Role, RolePermission, RoleUser } from '@prisma/client'
import {
  Put,
  Get,
  Req,
  Post,
  Body,
  Query,
  Param,
  Delete,
  UseGuards,
  Controller,
} from '@nestjs/common'

@ApiTags('role')
@Controller('/role')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  @Permissions(perm.advanced.administrator)
  createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.roleService.createRole(createRoleDto.name)
  }

  @Delete('/delete/:id')
  @Permissions(perm.advanced.administrator)
  async deleteRole(@Param('id') id: number): Promise<Role> {
    return this.roleService.deleteRole(id)
  }

  @Get('/load-all')
  loadAllRoles(): Promise<Role[]> {
    return this.roleService.loadAllRoles()
  }

  @Post('/check-permissions')
  checkUserPermissions(@Req() req: Request, @Body() body: CheckPermissionsDto) {
    return this.roleService.checkUserPermissions(req.user.userId, body.permissions)
  }

  @Get('/find-by-id/:id')
  findRoleById(@Param('id') roleId: number): Promise<Role> {
    return this.roleService.findRoleById(roleId)
  }

  @Put('/edit/:id')
  @Permissions(perm.advanced.administrator)
  editRole(@Param('id') id: number, @Body() body: EditRoleDto): Promise<Role> {
    return this.roleService.editRole(id, body.name)
  }

  @Post('/assign-user')
  @Permissions(perm.advanced.administrator)
  assignRoleToUser(@Body() body: AssignRoleToUserDto): Promise<RoleUser> {
    return this.roleService.assignRoleToUser(body.userId, body.roleId)
  }

  @Delete('/remove-user')
  @Permissions(perm.advanced.administrator)
  removeRoleToUser(@Body() body: RemoveRoleToUserDto): Promise<Prisma.BatchPayload> {
    return this.roleService.removeRoleFromUser(body.roleId, body.userId)
  }

  @Post('/add-permission')
  @Permissions(perm.advanced.administrator)
  addPermissionToRole(@Body() body: AddPermissionToRoleDto): Promise<RolePermission> {
    return this.roleService.addPermissionToRole(body.roleId, body.name)
  }

  @Delete('/remove-permission')
  @Permissions(perm.advanced.administrator)
  removePermissionFromRole(
    @Body() body: RemovePermissionFromRoleDto,
  ): Promise<Prisma.BatchPayload> {
    return this.roleService.removePermissionFromRole(body.roleId, body.permissionName)
  }

  @Post('/user/has-permission')
  userHasPermission(
    @Req() req: Request,
    @Query() query: UserHasPermissionsDto,
  ): Promise<{
    hasPermissions: boolean
  }> {
    return this.roleService.userHasPermission(req.user.userId, query.permissionName)
  }
}

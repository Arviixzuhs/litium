export const perm = Object.freeze({
  advanced: {
    administrator: '*',
  },
} as const)

type PermissionCategory = typeof perm
type PermissionValues<T> = T extends Record<string, infer U> ? U : never

export type PermissionType = {
  [K in keyof PermissionCategory]: PermissionValues<PermissionCategory[K]>
}[keyof PermissionCategory]

import { SetMetadata } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

export const Permissions = (...permissions: PermissionType[]) => {
  const permissionDescription = `Required permissions: ${permissions.join(', ')}`
  return (target: any, key: string | symbol, descriptor: PropertyDescriptor) => {
    SetMetadata('permissions', permissions)(target, key, descriptor)
    ApiOperation({ summary: permissionDescription })(target, key, descriptor)
  }
}

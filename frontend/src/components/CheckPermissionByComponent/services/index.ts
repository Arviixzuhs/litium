import { api } from '@/api/axios'
import { paramsConstructor } from '@/utils/paramsConstructor'

export const reqUserHasPermission = (permissionName: string) => {
  const params = paramsConstructor([{ name: 'permissionName', value: permissionName ?? null }])
  return api.post(`/role/user/has-permission?${params}`)
}

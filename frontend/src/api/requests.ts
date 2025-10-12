import { api } from './axios'

export const reqAuthLoadProfileByToken = async (token: string) =>
  api.get('/auth/load/profile/' + token)

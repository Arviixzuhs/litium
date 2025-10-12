import { api } from '@/api/axios'
import { LoginUserDto, RegisterUserDto } from './interfaces'

export const reqAuthLogin = (data: LoginUserDto) => api.post('/auth/login', data)
export const reqAuthRegister = (data: RegisterUserDto) => api.post('/auth/register', data)

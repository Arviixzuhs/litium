export interface RegisterUserDto {
  name: string
  email: string
  lastName: string
  password: string
  repeatPassword: string
}

export interface LoginUserDto {
  email: string
  password: string
}

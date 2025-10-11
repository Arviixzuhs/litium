import { User } from 'src/interfaces/user.interface'

declare module 'express' {
  interface Request {
    user?: User
  }
}

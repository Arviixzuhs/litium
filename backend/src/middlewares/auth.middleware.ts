import * as jwt from 'jsonwebtoken'
import { User } from '@/interfaces/user.interface'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { PUBLIC_ROUTES } from '@/config/publicRoutes'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization

      const isPublic = PUBLIC_ROUTES.some((route) => {
        // Convertimos el path a regex
        let pathPattern = route.path
          .replace(/:id/g, '[^/]+') // reemplaza :id por cualquier valor
          .replace(/\*\*/g, '.*') // reemplaza ** por cualquier subruta
        pathPattern += '(\\?.*)?$' // permitir query params

        const pathRegex = new RegExp('^' + pathPattern + '$')
        return route.method === req.method && pathRegex.test(req.path)
      })

      if (isPublic) {
        return next()
      }

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided or invalid format' })
      }

      const token = authHeader.split(' ')[1]

      jwt.verify(token, process.env.SECRET_KEY as string, (error, decoded) => {
        if (error) {
          return res.status(401).json({ message: 'Invalid token' })
        }

        const user = decoded as User
        req.user = user

        next()
      })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }
}

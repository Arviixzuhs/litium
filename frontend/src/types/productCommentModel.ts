import { ProductModel } from './productModel'
import { UserModel } from './userModel'

export interface CommentModel {
  id: number
  userId: number
  comment: string
  productId: number
  qualification: number
  isDeleted?: boolean | null
  deletedAt?: string | null
  createdAt: string

  // Relaciones
  user?: UserModel
  product?: ProductModel
  replies?: ReplyModel[]
}

export interface ReplyModel {
  id: number
  userId: number
  comment: string
  commentId: number
  replyId?: number | null
  isDeleted?: boolean | null
  deletedAt?: string | null
  createdAt: string

  // Relaciones
  user?: UserModel
  parent?: ReplyModel | null
  children?: ReplyModel[]
  commentRef?: CommentModel
}

import { QueryParams } from '@/api/interfaces'

export interface ReqCreateComment {
  comment: string
  productId: number
  qualification: number
}

export interface ReqGetCommentsParams extends QueryParams {
  productId: number
}

export interface ReqCreateCommentReply {
  comment: string
  replyId?: number
  commentId: number
}

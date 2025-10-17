import { api } from '@/api/axios'
import { CommentModel } from '@/types/productCommentModel'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { ReqCreateComment, ReqCreateCommentReply, ReqGetCommentsParams } from './interface'

export const reqCreateComment = (data: ReqCreateComment) => api.post<CommentModel>('/comment', data)
export const reqGetProductComments = (params: ReqGetCommentsParams) =>
  api.get<PaginatedResponse<CommentModel>>(`/comment/`, { params })

export const reqCreateReply = (data: ReqCreateCommentReply) => api.post('/reply', data)

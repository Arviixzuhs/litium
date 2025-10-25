import React from 'react'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import { CommentModel } from '@/types/productCommentModel'
import { reqCreateReply } from '../../services'
import { PaginatedResponse } from '@/types/paginatedResponse'
import { MessageCircle, Star } from 'lucide-react'
import { Button, Textarea, Avatar, Divider } from '@heroui/react'
import { reqCreateComment, reqGetProductComments } from '../../services'

export const ProductComment = () => {
  const user = useSelector((state: RootState) => state.user)
  const [rating, setRating] = React.useState(0)
  const [response, setResponse] = React.useState<PaginatedResponse<CommentModel> | null>(null)
  const [newReview, setNewReview] = React.useState('')
  const [replyText, setReplyText] = React.useState('')
  const [replyingTo, setReplyingTo] = React.useState<number | null>(null)
  const [hoveredRating, setHoveredRating] = React.useState(0)
  const params = useParams<{ productId: string }>()

  const loadData = () => {
    if (!params.productId) return
    reqGetProductComments({
      page: 0,
      size: 50,
      productId: Number(params.productId),
    })
      .then((res) => setResponse(res.data))
      .catch(console.log)
  }

  React.useEffect(() => {
    loadData()
  }, [params.productId])

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!params.productId) return
      await reqCreateComment({
        comment: newReview,
        productId: Number(params.productId),
        qualification: rating,
      })
      loadData()
      if (newReview.trim() && rating > 0) {
        setNewReview('')
        setRating(0)
        toast.success('Comentario enviado correctamente.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmitReply = async () => {
    if (replyText.trim() && replyingTo) {
      await reqCreateReply({
        comment: replyText,
        commentId: replyingTo,
      })
      setReplyText('')
      setReplyingTo(null)
      toast.success('Respuesta enviada correctamente')
      loadData()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className='mx-auto max-w-7xl space-y-8 px-4 py-8'>
      <div>
        <h2 className='mb-2 text-2xl font-bold'>Comentarios del producto</h2>
        <p className='text-muted-foreground'>
          {response?.totalItems} {response?.totalItems === 1 ? 'comentario' : 'comentarios'}
        </p>
      </div>
      <Divider />
      {user && (
        <>
          <div className='rounded-lg p-6 bg-card'>
            <h3 className='mb-4 text-lg font-semibold'>Escribe tu opinión</h3>
            <form onSubmit={handleSubmitReview} className='space-y-4'>
              <div>
                <label className='mb-2 block text-sm font-medium'>Tu calificación</label>
                <div className='flex gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type='button'
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className='transition-transform hover:scale-110'
                    >
                      <Star
                        className={`h-8 w-8 ${
                          star <= (hoveredRating || rating)
                            ? 'fill-accent text-accent'
                            : 'fill-muted-2 text-muted-2'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor='review-comment' className='mb-2 block text-sm font-medium'>
                  Tu comentario
                </label>
                <Textarea
                  id='review-comment'
                  placeholder='Comparte tu experiencia con este producto...'
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  rows={4}
                  className='resize-none'
                />
              </div>
              <Button
                type='submit'
                color='primary'
                radius='sm'
                disabled={!newReview.trim() || rating === 0}
              >
                Publicar comentario
              </Button>
            </form>
          </div>
          <Divider />
        </>
      )}
      <div className='space-y-6'>
        {response?.content.length === 0 ? (
          <p className='py-8 text-center text-muted-foreground'>
            Aún no hay comentarios. ¡Sé el primero en opinar!
          </p>
        ) : (
          response?.content.map((review) => (
            <div key={review.id} className='rounded-lg bg-card p-6'>
              <div className='mb-4 flex items-start justify-between'>
                <div className='flex gap-3'>
                  <Avatar></Avatar>
                  <div>
                    <div className='mb-1 flex items-center gap-2'>
                      <span className='font-semibold'>
                        {review.user?.name} {review.user?.lastName}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='flex gap-0.5'>
                        {[...Array(review.qualification)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.qualification ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
                          />
                        ))}
                      </div>
                      <span className='text-sm text-muted-foreground'>
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className='mb-4 text-pretty leading-relaxed'>{review.comment}</p>
              <div className='flex items-center gap-4'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='gap-2'
                  onPress={() => setReplyingTo(replyingTo === review.id ? null : review.id)}
                >
                  <MessageCircle className='h-4 w-4' />
                  Responder
                </Button>
              </div>
              {replyingTo === review.id && (
                <div className='mt-4 rounded-lg'>
                  <Textarea
                    placeholder='Escribe tu respuesta...'
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={3}
                    className='mb-2 resize-none'
                  />
                  <div className='flex gap-2'>
                    <Button
                      size='sm'
                      onPress={handleSubmitReply}
                      color='primary'
                      disabled={!replyText.trim()}
                    >
                      Enviar respuesta
                    </Button>
                    <Button size='sm' variant='flat' onPress={() => setReplyingTo(null)}>
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
              {review.replies && review.replies.length > 0 && (
                <div className='mt-4 space-y-4 border-l-2 border-gray-300 pl-6'>
                  {review.replies.map((reply) => (
                    <div key={reply.id} className='rounded-lg bg-muted/30 p-4'>
                      <div className='mb-2 flex items-start gap-3'>
                        <Avatar className='h-8 w-8'></Avatar>
                        <div className='flex-1'>
                          <div className='mb-1 flex items-center gap-2'>
                            <span className='text-sm font-semibold'>
                              {reply.user?.name} {reply.user?.lastName}
                            </span>
                            <span className='text-xs text-muted-foreground'>
                              {formatDate(reply.createdAt)}
                            </span>
                          </div>
                          <p className='text-sm leading-relaxed text-pretty'>{reply.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

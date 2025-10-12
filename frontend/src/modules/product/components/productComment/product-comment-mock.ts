export interface Review {
  id: string
  productId: string
  userName: string
  userAvatar: string
  rating: number
  date: string
  comment: string
  helpful: number
  verified: boolean
  replies?: Reply[]
}

export interface Reply {
  id: string
  userName: string
  userAvatar: string
  date: string
  comment: string
  helpful: number
}

export const reviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userName: 'Carlos Mendoza',
    userAvatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '2024-01-15',
    comment:
      'Excelente laptop, el rendimiento es increíble. La pantalla es espectacular y la batería dura todo el día. Totalmente recomendada para trabajo profesional.',
    helpful: 24,
    verified: true,
    replies: [
      {
        id: 'rep1',
        userName: 'Tech Store',
        userAvatar: '/placeholder.svg?height=40&width=40',
        date: '2024-01-16',
        comment:
          '¡Gracias por tu comentario Carlos! Nos alegra que estés disfrutando tu nueva MacBook Pro.',
        helpful: 5,
      },
      {
        id: 'rep2',
        userName: 'Pedro Sánchez',
        userAvatar: '/placeholder.svg?height=40&width=40',
        date: '2024-01-17',
        comment: 'Estoy pensando en comprarla, ¿qué tal va para programación?',
        helpful: 2,
      },
    ],
  },
  {
    id: 'r2',
    productId: '1',
    userName: 'María González',
    userAvatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    date: '2024-01-10',
    comment:
      'Muy buena laptop, aunque el precio es elevado. El chip M3 Max es una bestia para edición de video. Solo le falta un puerto USB-A.',
    helpful: 18,
    verified: true,
    replies: [
      {
        id: 'rep3',
        userName: 'Carlos Mendoza',
        userAvatar: '/placeholder.svg?height=40&width=40',
        date: '2024-01-11',
        comment: 'Totalmente de acuerdo, yo uso un hub USB-C y funciona perfecto.',
        helpful: 3,
      },
    ],
  },
  {
    id: 'r3',
    productId: '1',
    userName: 'Juan Pérez',
    userAvatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '2024-01-05',
    comment:
      'La mejor inversión que he hecho. Perfecta para desarrollo y diseño. La calidad de construcción es premium.',
    helpful: 31,
    verified: false,
  },
  {
    id: 'r4',
    productId: '2',
    userName: 'Ana Rodríguez',
    userAvatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '2024-01-20',
    comment:
      'El iPhone 15 Pro Max es simplemente perfecto. La cámara es increíble, el diseño en titanio se siente premium y el rendimiento es brutal.',
    helpful: 45,
    verified: true,
  },
  {
    id: 'r5',
    productId: '2',
    userName: 'Luis Martínez',
    userAvatar: '/placeholder.svg?height=40&width=40',
    rating: 4,
    date: '2024-01-18',
    comment:
      'Excelente teléfono, pero el precio es muy alto. La batería podría ser mejor. Por lo demás, es el mejor iPhone hasta ahora.',
    helpful: 12,
    verified: true,
  },
  {
    id: 'r6',
    productId: '3',
    userName: 'Sofia Torres',
    userAvatar: '/placeholder.svg?height=40&width=40',
    rating: 5,
    date: '2024-01-12',
    comment:
      'Los mejores auriculares que he probado. La cancelación de ruido es impresionante y la calidad de sonido es excepcional. Perfectos para viajes.',
    helpful: 28,
    verified: true,
  },
]

export function getReviewsByProductId(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId)
}

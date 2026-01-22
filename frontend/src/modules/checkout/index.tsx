import { useState } from 'react'
import { Shopping } from '../messages/components/Shopping'
import { useNavigate, useParams } from 'react-router-dom'
import { PaymentForm } from './components/PaymentForm'
import { DeliveryForm } from './components/DeliveryForm'
import { CheckoutData } from '@/types/checkoutModel'
import { StepIndicator } from './components/StepIndicator'
import { RecipientForm } from './components/RecipientForm'
import { useImageUpload } from '@/components/ImageUploader/providers/ImageUploaderProvider'
import { ConfirmationStep } from './components/ConfirmationStep'
import { Button, Card, CardBody } from '@heroui/react'
import { reqCheckoutShoppingCart } from './services'
import { ArrowLeft, ArrowRight, User2, Truck, CreditCard, CheckCircle } from 'lucide-react'

const STEPS = [
  {
    number: 1,
    title: 'Destinatario',
    icon: <User2 size={14} />,
  },
  {
    number: 2,
    title: 'Envío',
    icon: <Truck size={14} />,
  },
  {
    number: 3,
    title: 'Pago',
    icon: <CreditCard size={14} />,
  },
  {
    number: 4,
    title: 'Confirmación',
    icon: <CheckCircle size={14} />,
  },
]

const initialData: CheckoutData = {
  recipient: {
    firstName: '',
    lastName: '',
    phone: '',
    documentId: '',
  },
  delivery: {
    method: null,
    agency: null,
    address: {
      state: '',
      city: '',
      addressLine: '',
      referencePoint: '',
    },
  },
  payment: {
    method: 'TRANSFER',
    reference: '',
    amount: '',
    paymentDate: '',
  },
}

export function CheckoutPage() {
  const params = useParams<{ cartId: string }>()
  const [currentStep, setCurrentStep] = useState(1)
  const [checkoutData, setCheckoutData] = useState<CheckoutData>(initialData)
  const { images } = useImageUpload()
  const navigate = useNavigate()

  const canGoNext = () => {
    switch (currentStep) {
      case 1:
        const { firstName, lastName, phone, documentId } = checkoutData.recipient
        return firstName && lastName && phone && documentId
      case 2:
        const { method, agency, address } = checkoutData.delivery
        if (!method) return false
        if (method === 'STORE_PICKUP') return true
        if (!agency) return false
        return address.state && address.city && address.addressLine
      case 3:
        const { method: payMethod, reference, amount, paymentDate } = checkoutData.payment
        return payMethod && reference && amount && paymentDate && images
      default:
        return true
    }
  }

  const handleNext = async () => {
    if (currentStep < 4 && canGoNext()) {
      setCurrentStep(currentStep + 1)
    }

    try {
      if (!params.cartId || currentStep !== 3 || !images[0].file) return
      const response = await reqCheckoutShoppingCart(
        Number(params.cartId),
        checkoutData,
        images[0].file,
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleNavigate = () => {
    navigate(`/messages/${params.cartId}`)
  }

  return (
    <main className='min-h-screen w-full bg-background py-8 px-4'>
      <div className='mb-8 flex flex-col items-center justify-center gap-3'>
        <div className='mb-8'>
          <StepIndicator currentStep={currentStep} steps={STEPS} />
        </div>
        <div className='flex gap-2'>
          <Card className='w-4xl' shadow='none'>
            <CardBody className='p-6 md:p-8'>
              {currentStep === 1 && (
                <RecipientForm
                  data={checkoutData.recipient}
                  onChange={(recipient) => setCheckoutData({ ...checkoutData, recipient })}
                />
              )}

              {currentStep === 2 && (
                <DeliveryForm
                  data={checkoutData.delivery}
                  onChange={(delivery) => setCheckoutData({ ...checkoutData, delivery })}
                />
              )}

              {currentStep === 3 && (
                <PaymentForm
                  data={checkoutData.payment}
                  onChange={(payment) => setCheckoutData({ ...checkoutData, payment })}
                />
              )}

              {currentStep === 4 && <ConfirmationStep />}

              <div className='mt-8 flex items-center justify-between pt-6'>
                {currentStep > 1 && currentStep < 4 ? (
                  <Button
                    radius='sm'
                    variant='flat'
                    onPress={handleBack}
                    startContent={<ArrowLeft className='h-4 w-4' />}
                  >
                    Atrás
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <Button
                    color='primary'
                    radius='sm'
                    onPress={handleNext}
                    disabled={!canGoNext()}
                    endContent={<ArrowRight className='h-4 w-4' />}
                  >
                    {currentStep === 3 ? 'Confirmar Pedido' : 'Siguiente'}
                  </Button>
                ) : (
                  <Button
                    onPress={handleNavigate}
                    color='primary'
                    radius='sm'
                    endContent={<ArrowRight className='h-4 w-4' />}
                  >
                    Ver mensajes
                  </Button>
                )}
              </div>
            </CardBody>
          </Card>
          {currentStep !== 4 && <Shopping hiddeActios />}
        </div>
      </div>
    </main>
  )
}

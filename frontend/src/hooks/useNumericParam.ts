import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const useNumericParamGuard = (paramName: string, redirectTo = '/') => {
  const params = useParams()
  const navigate = useNavigate()

  const value = params[paramName]
  const parsed = Number(value)
  const isValid = value && !isNaN(parsed)

  React.useEffect(() => {
    if (!isValid) {
      navigate(redirectTo, { replace: true })
    }
  }, [isValid, navigate, redirectTo])

  return isNaN(parsed) ? null : parsed
}

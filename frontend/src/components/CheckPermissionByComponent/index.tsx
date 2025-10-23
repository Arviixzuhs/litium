import { cn } from '@heroui/theme'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { reqUserHasPermission } from './services'

interface SectionPermissionMiddlewareProps {
  mode?: 'remove' | 'opacity'
  children: React.ReactNode
  permission: string | null
}

export const CheckPermissionByComponent = ({
  mode = 'opacity',
  children,
  permission,
}: SectionPermissionMiddlewareProps) => {
  const [hasPermissions, setHasPermissions] = React.useState(false)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (permission) {
      reqUserHasPermission(permission)
        .then((res) => {
          setHasPermissions(res.data.hasPermissions)
        })
        .catch(() => navigate('/404'))
    } else {
      setHasPermissions(true)
    }
  }, [setHasPermissions, navigate, permission])

  if (!hasPermissions && mode == 'remove') return <></>

  return (
    <div
      className={cn(
        `w-full h-full ${!hasPermissions && 'select-none cursor-not-allowed opacity-65 pointer-events-none'}`,
      )}
    >
      {children}
    </div>
  )
}

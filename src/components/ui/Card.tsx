import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CardProps = {
  children: ReactNode
  className?: string
}

function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-xl shadow-xl p-6 text-fg shadow-sm', className)}>{children}</div>
  )
}

export default Card

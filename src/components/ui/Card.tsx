import type { ReactNode } from 'react'

type CardProps = {
  children: ReactNode
  className?: string
}

function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`rounded-xl border border-[var(--color-border)] p-6 text-[var(--color-fg)] shadow-sm ${className}`}>
      {children}
    </div>
  )
}

export default Card



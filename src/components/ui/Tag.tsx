import { cn } from '@/lib/cn'

type TagProps = {
  text: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeStyles = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
}

export default function Tag({ text, size = 'md', className = '' }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center font-medium uppercase whitespace-nowrap',
        sizeStyles[size],
        className,
      )}
    >
      {text}
    </span>
  )
}

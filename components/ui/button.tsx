import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold'
  size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
          {
            'bg-amber-500 text-black hover:bg-amber-400 shadow-lg shadow-amber-500/20':
              variant === 'primary',
            'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700':
              variant === 'secondary',
            'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800':
              variant === 'ghost',
            'bg-gradient-to-r from-amber-600 to-yellow-500 text-black hover:from-amber-500 hover:to-yellow-400 shadow-lg shadow-amber-500/25':
              variant === 'gold',
          },
          {
            'h-8 px-3 text-xs': size === 'sm',
            'h-10 px-5 text-sm': size === 'md',
            'h-12 px-8 text-base': size === 'lg',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button }

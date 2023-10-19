import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'flex justify-center items-center rounded-md transition-all duration-300 ease-in-out disabled:bg-zinc-300 disabled:cursor-not-allowed font-light',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--main-color-400)] hover:bg-[var(--main-color-300)] active:bg-[var(--main-color-200)]  text-[var(--neutral)] focus:outline-[var(--main-color-500)]',
        outline:
          'bg-[var(--neutral)] hover:text-[var(--main-color-300)] border-2 border-[var(--main-color-400)]	hover:border-[var(--main-color-300)] active:text-[var(--main-color-200)] text-[var(--main-color-400)] focus:outline-[var(--main-color-500)]',
        mini: 'rounded-md shadow-sm text-xs text-[var(--main-color-300)] font-normal border',
        blank: 'text-xs text-[var(--main-color-300)] font-normal'
      },
      size: {
        default: 'w-36 h-9 my-3',
        mini: 'w-6 h-6 my-0 '
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

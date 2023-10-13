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
          'bg-sky-400 hover:bg-sky-300 active:bg-sky-200  text-white focus:outline-sky-500',
        outline:
          'bg-white hover:text-sky-300 border-2 border-sky-400	hover:border-sky-300 active:text-sky-200 text-sky-400 focus:outline-sky-500',
        mini: 'rounded-md shadow-sm text-xs text-sky-300 font-normal border',
        blank: 'text-xs text-sky-300 font-normal'
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

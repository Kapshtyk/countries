import { ZoomInIcon } from '@radix-ui/react-icons'
import React, { useEffect, useState } from 'react'

import { Button } from '@/ui/button'

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder: string
  onBlur?: () => void
  renderCloseButton?: boolean
  renderIcon?: boolean
}

const Input = ({
  id,
  placeholder,
  onBlur,
  renderCloseButton = false,
  renderIcon = false,
  ...rest
}: IInput) => {
  const [isFocused, setIsFocused] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])

  return (
    <div className="relative w-full">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        className="relative placeholder:text-slate-400 placeholder:text-sm w-full font-light p-2 h-10 border border-sky-200 rounded-md focus:!outline-sky-300 focus:outline-2"
        id={id}
        {...rest}
        placeholder={isFocused ? '' : placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false)
          onBlur && onBlur()
        }}
      />
      {!isMobile && renderCloseButton && (
        <Button
          variant="mini"
          size="mini"
          style={{ display: isFocused ? 'block' : 'none' }}
          className="absolute w-8 top-2 bottom-0 right-3"
        >
          ESC
        </Button>
      )}
      {renderIcon && !isFocused && (
        <ZoomInIcon className="absolute w-5 h-5 top-3 right-3 text-slate-400" />
      )}
    </div>
  )
}

export { Input }

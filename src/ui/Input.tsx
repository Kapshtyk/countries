import React, { useEffect, useState } from 'react'

import styles from '@/ui/Input.module.css'

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder: string
  onBlur?: () => void
  renderCloseButton?: boolean
}

const Input = ({
  id,
  placeholder,
  onBlur,
  renderCloseButton = false,
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
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <input
        className={styles.input_field}
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
        <button
          style={{ display: isFocused ? 'block' : 'none' }}
          className="absolute my-2 w-8 rounded-md shadow-sm top-0 bottom-0 right-3 text-xs text-sky-300 font-normal border"
        >
          ESC
        </button>
      )}
    </div>
  )
}

export default Input

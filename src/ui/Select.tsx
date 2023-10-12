import React, { useState } from 'react'

import styles from '@/ui/Select.module.css'

import { useClickOutside } from '@/hooks/useClickOutside'
import { useKeyDown } from '@/hooks/useKeyDown'

interface ISelect {
  values: string[]
  selected: string[]
  setSelected: (selected: string[]) => void
  id: string
  placeholder: string
  [x: string]: any
}

const Select = ({
  values,
  selected,
  setSelected,
  id,
  placeholder,
  ...rest
}: ISelect) => {
  const [isListOpen, setIsListOpen] = useState(false)

  useKeyDown(() => {
    setIsListOpen(false)
  }, ['Escape'])

  const handleItemsClick = (e: any, value: string) => {
    e.stopPropagation()
    if (selected.includes(value)) {
      setSelected(
        selected
          .filter((item) => item !== value)
          .sort((a, b) => a.localeCompare(b))
      )
    } else {
      setSelected([...selected, value].sort((a, b) => a.localeCompare(b)))
    }
  }

  const ref = useClickOutside(() =>
    setIsListOpen(false)
  ) as React.RefObject<HTMLUListElement>

  return (
    <div className="w-96">
      <div className="relative">
        <label htmlFor={id} className="sr-only">
          {placeholder}
        </label>
        <div
          className={`${styles.select_field} ${isListOpen && 'outline outline-sky-300 outline-2'
            }`}
          tabIndex={10}
          id={id}
          {...rest}
          onClick={() => setIsListOpen(!isListOpen)}
        >
          {selected.length === 0 ? placeholder : selected.join(', ')}
          <ul
            ref={ref}
            className="absolute top-[41px] py-2 left-0 w-96 px-4 bg-white border border-gray-300 rounded-md shadow-lg z-50"
            style={{ display: isListOpen ? 'block' : 'none' }}
          >
            {values
              .sort((a, b) => a.localeCompare(b))
              .map((value) => (
                <li
                  className={`h-8 px-2 hover:bg-slate-200 border-b flex items-center ${selected.includes(value) && 'font-normal bg-slate-100'
                    }`}
                  key={value}
                  value={value}
                  onClick={(e) => handleItemsClick(e, value)}
                >
                  {value}
                </li>
              ))}
          </ul>
          {isListOpen && (
            <button
              style={{ display: isListOpen ? 'block' : 'none' }}
              className="absolute my-2 w-8 rounded-md shadow-sm top-0 bottom-0 right-3 text-xs text-sky-300 font-normal border"
            >
              ESC
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Select

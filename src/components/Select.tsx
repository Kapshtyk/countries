import { DoubleArrowDownIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'

import { useClickOutside } from '@/hooks/useClickOutside'
import { useKeyDown } from '@/hooks/useKeyDown'

import { Button } from '@/ui'

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

  const styleIfListOpen = isListOpen ? 'outline outline-sky-300 outline-2' : ''

  return (
    <div className="w-full max-w-md sm:max-w-sm self-center">
      <div className="relative">
        <label htmlFor={id} className="sr-only">
          {placeholder}
        </label>
        <div
          className={`relative h-10 bg-white text-sm text-slate-400 font-light p-2 w-full border border-sky-200 rounded-md focus:outline-sky-300 focus:outline-2 ${styleIfListOpen}`}
          tabIndex={10}
          id={id}
          {...rest}
          onClick={() => setIsListOpen(!isListOpen)}
        >
          {selected.length === 0 ? placeholder : selected.join(', ')}
          <ul
            ref={ref}
            className="absolute top-[41px] py-2 left-0 w-full max-w-md sm:max-w-sm px-4 bg-white border border-gray-300 rounded-md shadow-lg z-50"
            style={{ display: isListOpen ? 'block' : 'none' }}
          >
            {values
              .sort((a, b) => a.localeCompare(b))
              .map((value) => (
                <li
                  className={`h-8 px-2 hover:bg-slate-200 border-b flex items-center ${
                    selected.includes(value) && 'font-normal bg-slate-100'
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
            <Button
              variant="mini"
              size="mini"
              style={{ display: isListOpen ? 'block' : 'none' }}
              className="absolute w-8 top-2 bottom-0 right-3"
            >
              ESC
            </Button>
          )}
          {!isListOpen && (
            <DoubleArrowDownIcon className="absolute w-4 h-4 top-3 right-3 text-slate-400" />
          )}
        </div>
      </div>
    </div>
  )
}

export default Select
